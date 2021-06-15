"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.awsS3Delete = exports.awsS3ArrayUpload = exports.awsS3Upload = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const Logger_1 = __importDefault(require("./Logger"));
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION,
});
//? 단일 이미지 처리
exports.awsS3Upload = multer_1.default({
    storage: multer_s3_1.default({
        s3: s3,
        bucket: String(process.env.S3_BUCKET),
        key: (req, file, callback) => {
            const extension = path_1.default.extname(file.originalname);
            extension.split(".")[1];
            callback(null, Date.now().toString() + extension);
        },
        acl: process.env.S3_ACL,
    }),
    fileFilter: (req, file, callback) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extName = fileTypes.test(path_1.default.extname(file.originalname).toLocaleLowerCase());
        if (extName) {
            return callback(null, true);
        }
        else {
            req.query.fileTypeError = "1";
            callback(Error("Error : Images Only!"));
        }
    }
}).single("image");
//? 한개 이상의 이미지 처리
exports.awsS3ArrayUpload = multer_1.default({
    storage: multer_s3_1.default({
        s3: s3,
        bucket: String(process.env.S3_BUCKET),
        key: (req, files, callback) => {
            const extension = path_1.default.extname(files.originalname);
            extension.split(".")[1];
            callback(null, Date.now().toString() + extension);
        },
        acl: process.env.S3_ACL,
    }),
    fileFilter: (req, file, callback) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extName = fileTypes.test(path_1.default.extname(file.originalname).toLocaleLowerCase());
        if (extName) {
            return callback(null, true);
        }
        else {
            req.query.fileTypeError = "1";
            callback(Error("Error : Images Only!"));
        }
    }
}).array("images", 5);
//? 이미지 삭제
const awsS3Delete = (fullUrlKey) => {
    if (fullUrlKey) {
        const step1 = fullUrlKey.split("com")[1];
        const key = step1.split("/")[1];
        s3.deleteObject({
            Bucket: String(process.env.S3_BUCKET),
            Key: key
        }, (err, data) => {
            if (err)
                Logger_1.default.info(`Image delete false : ${err}`);
            else
                Logger_1.default.info("Image delete success");
        });
    }
    else {
        Logger_1.default.info("이미지 id는 있지만, null 값으로 존재");
    }
};
exports.awsS3Delete = awsS3Delete;
