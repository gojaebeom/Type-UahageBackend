"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3MultiFileMiddleware = exports.s3Middleware = void 0;
const User_repo_1 = require("../app/repository/user/User.repo");
const AwsS3_1 = require("../config/AwsS3");
const Logger_1 = __importDefault(require("../config/Logger"));
const s3Middleware = (req, res, next) => {
    Logger_1.default.info("미들웨어 방문");
    AwsS3_1.awsS3Upload(req, res, (error) => __awaiter(void 0, void 0, void 0, function* () {
        Logger_1.default.info("파일 채크!!");
        Logger_1.default.info(req.file);
        if (error) {
            // 업로드 문제 발생
            Logger_1.default.info("Upload Error");
            if (req.query.fileTypeError)
                return res.status(500).json({ message: "image filetype error" });
            return res.status(500).json({ message: "image upload error" });
        }
        else {
            // 성공
            const userId = req.params.id;
            if (req.file === undefined) {
                // image 파일을 올리지 않을 경우
                Logger_1.default.info("No File Selected!");
                Logger_1.default.info(req.body.imgInit);
                // 이미지 삭제 요청
                if (req.body.imgInit === "Y") {
                    let repoObject = yield User_repo_1.validateImageById(userId);
                    if (!repoObject.success)
                        return res.status(500).json({ message: "image validate error" });
                    if (repoObject.result) {
                        Logger_1.default.info("이미지 존재");
                        repoObject = yield User_repo_1.findImagePath(userId);
                        if (!repoObject.success)
                            return res.status(500).json({ message: "image select error" });
                        const key = repoObject.result[0].image_path;
                        AwsS3_1.awsS3Delete(key);
                        repoObject = yield User_repo_1.editImage(userId, null);
                        if (!repoObject.success)
                            return res.status(500).json({ message: "image update error" });
                    }
                    else {
                        Logger_1.default.info("이미지 없음");
                    }
                }
            }
            else {
                // 이미지 파일이 올려진 경우
                Logger_1.default.info("File Selected!");
                const imagePath = req.file.location;
                let repoObject = yield User_repo_1.validateImageById(userId);
                if (!repoObject.success)
                    return res.status(500).json({ message: "image validate error" });
                if (repoObject.result) {
                    Logger_1.default.info("이미지 존재, 기존 이미지 수정");
                    repoObject = yield User_repo_1.findImagePath(userId);
                    if (!repoObject.success)
                        return res.status(500).json({ message: "image select error" });
                    const key = repoObject.result[0].image_path;
                    AwsS3_1.awsS3Delete(key);
                    repoObject = yield User_repo_1.editImage(userId, imagePath);
                    if (!repoObject.success)
                        return res.status(500).json({ message: "image update error" });
                }
                else {
                    Logger_1.default.info("이미지 없음, 새로 생성");
                    repoObject = yield User_repo_1.storeImage(userId, imagePath);
                    if (!repoObject.success)
                        return res.status(500).json({ message: "image store error" });
                }
            }
            next();
        }
    }));
};
exports.s3Middleware = s3Middleware;
const s3MultiFileMiddleware = (req, res, next) => {
    AwsS3_1.awsS3ArrayUpload(req, res, (error) => __awaiter(void 0, void 0, void 0, function* () {
        Logger_1.default.info(req.files);
        if (error) {
            // 업로드 문제 발생
            Logger_1.default.info("Upload Error");
            if (req.query.fileTypeError)
                return res.status(500).json({ message: "image filetype error" });
            return res.status(500).json({ message: "image upload error" });
        }
        else {
            // 성공
            next();
        }
    }));
};
exports.s3MultiFileMiddleware = s3MultiFileMiddleware;
