"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.findUserIdByReviewId = exports._delete = exports.update = exports.store = exports.findOne = exports.findByOptions = void 0;
const AwsS3_1 = require("../../../config/AwsS3");
const Logger_1 = __importDefault(require("../../../config/Logger"));
const repository = __importStar(require("../../repository/place/Restaurant.repo"));
const findByOptions = (placeId, type, order) => __awaiter(void 0, void 0, void 0, function* () {
    type = type !== null && type.toUpperCase();
    if (type === "IMG") {
        return yield repository.findReviewImages(placeId);
    }
    else {
        const option = order.toUpperCase();
        return yield repository.findReviewsByOption(placeId, option);
    }
});
exports.findByOptions = findByOptions;
const findOne = (reviewId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.findOneReview(reviewId); });
exports.findOne = findOne;
const store = (body, images) => __awaiter(void 0, void 0, void 0, function* () {
    const tasteRating = Number(body.tasteRating);
    const costRating = Number(body.costRating);
    const serviceRating = Number(body.serviceRating);
    let totalRating = (tasteRating + costRating + serviceRating) / 3;
    totalRating = totalRating.toFixed(1);
    Logger_1.default.info(`맛:${tasteRating}\n가격:${costRating}\n서비스레이팅:${serviceRating}\n토탈레이팅:${totalRating}`);
    if (!images.length) {
        Logger_1.default.info("이미지 없음, 리뷰만 저장");
        return yield repository.storeReview({
            userId: body.userId,
            placeId: body.placeId,
            desc: body.desc,
            totalRating: totalRating,
            tasteRating: tasteRating,
            costRating: costRating,
            serviceRating: serviceRating
        });
    }
    else {
        Logger_1.default.info("이미지 있음, 리뷰, 이미지 저장");
        return yield repository.storeReviewWithImages({
            images: images,
            userId: body.userId,
            placeId: body.placeId,
            desc: body.desc,
            totalRating: totalRating,
            tasteRating: tasteRating,
            costRating: costRating,
            serviceRating: serviceRating
        });
    }
});
exports.store = store;
const update = (reviewId, body, images) => __awaiter(void 0, void 0, void 0, function* () {
    const desc = body.desc;
    const tasteRating = Number(body.tasteRating);
    const costRating = Number(body.costRating);
    const serviceRating = Number(body.serviceRating);
    let totalRating = (tasteRating + costRating + serviceRating) / 3;
    totalRating = totalRating.toFixed(1);
    Logger_1.default.info(reviewId);
    Logger_1.default.info(`맛:${tasteRating}\n가격:${costRating}\n서비스레이팅:${serviceRating}\n토탈레이팅:${totalRating}`);
    const deleteImgList = body.deleteImage;
    Logger_1.default.info(deleteImgList);
    let repoObj;
    if (deleteImgList) {
        deleteImgList.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            repoObj = yield repository.deleteReviewImage(item);
            Logger_1.default.info(`${item} 이미지 삭제 완료`);
            AwsS3_1.awsS3Delete(item);
        }));
    }
    if (!images.length) {
        Logger_1.default.info("이미지 없음, 리뷰만 수정");
        return yield repository.updateReview(reviewId, {
            desc: desc,
            totalRating: totalRating,
            tasteRating: tasteRating,
            costRating: costRating,
            serviceRating: serviceRating
        });
    }
    else {
        Logger_1.default.info("이미지 있음, 리뷰수정 및 이미지 생성");
        repoObj = yield repository.updateReview(reviewId, {
            desc: desc,
            totalRating: totalRating,
            tasteRating: tasteRating,
            costRating: costRating,
            serviceRating: serviceRating
        });
        if (!repoObj.success)
            return repoObj;
        repoObj = yield repository.storeReviewImages(reviewId, images);
    }
    return repoObj;
});
exports.update = update;
const _delete = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield repository._delete(reviewId);
});
exports._delete = _delete;
const findUserIdByReviewId = (reviewId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.findUserIdByReviewId(reviewId); });
exports.findUserIdByReviewId = findUserIdByReviewId;
