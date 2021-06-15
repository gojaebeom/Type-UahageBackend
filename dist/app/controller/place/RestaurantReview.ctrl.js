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
exports._delete = exports.update = exports.store = exports.findOne = exports.findByOptions = void 0;
const service = __importStar(require("../../service/place/RestaurantReview.service"));
const Logger_1 = __importDefault(require("../../../config/Logger"));
//? 리뷰 리스트 보기
const findByOptions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const placeId = req.params.id;
    let type = req.query.type || null;
    const order = req.query.order || "DATE"; // date, top, low
    const { success, message, result, error } = yield service.findByOptions(placeId, type, order);
    success ?
        res.status(200).json({ message: message, data: result }) :
        res.status(500).json({ message: message, error: error });
});
exports.findByOptions = findByOptions;
//? 리뷰 상세보기
const findOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewId = req.params.id;
    const { success, message, result, error } = yield service.findOne(reviewId);
    success ?
        res.status(200).json({ message: message, data: result }) :
        res.status(500).json({ message: message, error: error });
});
exports.findOne = findOne;
//? 리뷰 생성
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Logger_1.default.info(`Request Review Store`);
    const body = req.body;
    const imgFiles = req.files;
    const { userId } = body;
    const tokenUserId = req.query.tokenUserId;
    //? 요청자/작성자 동일 판별
    if (Number(tokenUserId) !== Number(userId)) {
        Logger_1.default.info(`tokenUserId: ${userId}\nuserId: ${userId}`);
        return res.status(403).json({
            message: "Not metched User",
            data: false
        });
    }
    const { success, message, result, error } = yield service.store(body, imgFiles);
    success ?
        res.status(200).json({ message: message, data: result }) :
        res.status(500).json({ message: message, error: error });
});
exports.store = store;
//? 리뷰 수정하기
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewId = req.params.id;
    const body = req.body;
    Logger_1.default.info(body);
    const images = req.files;
    const { userId } = body;
    const tokenUserId = req.query.tokenUserId;
    //? 요청자/작성자 동일 판별
    if (Number(tokenUserId) !== Number(userId)) {
        Logger_1.default.info(`tokenUserId: ${userId}\nuserId: ${userId}`);
        return res.status(403).json({
            message: "Not metched User",
            data: false
        });
    }
    const { success, message, result, error } = yield service.update(reviewId, body, images);
    success ?
        res.status(200).json({ message: message, data: result }) :
        res.status(500).json({ message: message, error: error });
});
exports.update = update;
//? 리뷰 삭제
const _delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewId = req.params.id;
    let serviceObj = yield service.findUserIdByReviewId(reviewId);
    const userId = serviceObj.result || 0;
    if (!serviceObj.success)
        return res.status(500).json({ message: serviceObj.message, error: serviceObj.error });
    const tokenUserId = req.query.tokenUserId;
    //? 요청자/작성자 동일 판별
    if (Number(tokenUserId) !== Number(serviceObj.result)) {
        Logger_1.default.info(`tokenUserId: ${userId}\nuserId: ${userId}`);
        return res.status(403).json({
            message: "Not metched User",
            data: false
        });
    }
    let { success, message, result, error } = yield service._delete(reviewId);
    success ?
        res.status(200).json({ message: message, data: result }) :
        res.status(500).json({ message: message, error: error });
});
exports._delete = _delete;
