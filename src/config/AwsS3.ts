"use strict";
import AWS from "aws-sdk";
import path from "path";
import multer from "multer";
import multerS3 from "multer-s3";
import log from "./Logger";
import { Request } from "express";

const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey : process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION,
});

//? 단일 이미지 처리
export const awsS3Upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: String(process.env.S3_BUCKET),
        key: (req, file, callback) => {

            const extension = path.extname(file.originalname);
            extension.split(".")[1];

            callback(null, Date.now().toString() + extension);
        },
        acl: process.env.S3_ACL,
    }),
    fileFilter : (req: Request, file, callback) => {

        const fileTypes = /jpeg|jpg|png|gif/;
        const extName = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase());

        if( extName ) {
            return callback(null, true); 
        } else {
            req.query.fileTypeError = "1";
            callback(Error("Error : Images Only!"));
        }
    }
}).single("image");


//? 한개 이상의 이미지 처리
export const awsS3ArrayUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: String(process.env.S3_BUCKET),
        key: (req, files, callback) => {
            const extension = path.extname(files.originalname);
            extension.split(".")[1];
            callback(null, Date.now().toString() + extension);
        },
        acl: process.env.S3_ACL,
    }),
    fileFilter : (req, file, callback) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extName = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase());

        if( extName ) {
            return callback(null, true); 
        } else {
            req.query.fileTypeError = "1";
            callback(Error("Error : Images Only!"));
        }
    }
}).array("images", 5);


//? 이미지 삭제
export const awsS3Delete = ( fullUrlKey: string ) => {
    if( fullUrlKey ){
        const step1 = fullUrlKey.split("com")[1];
        const key = step1.split("/")[1];
        s3.deleteObject({
            Bucket : String(process.env.S3_BUCKET),
            Key : key
        }, (err, data) => {
            if(err) log.info(`Image delete false : ${ err }`);
            else log.info("Image delete success");
        });
    } else {
        log.info("이미지 id는 있지만, null 값으로 존재");
    }
}
