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
exports.bookmarkToogle = void 0;
const Logger_1 = __importDefault(require("../../../config/Logger"));
const service = __importStar(require("../../service/place/RestaurantBookmark.service"));
// 북마크 관계 생성, 또는 제거
const bookmarkToogle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUserId = req.query.tokenUserId;
    const { userId, placeId } = req.body;
    //? 요청자/작성자 동일 판별
    if (Number(tokenUserId) !== Number(userId)) {
        Logger_1.default.info(`tokenUserId: ${userId}\nuserId: ${userId}`);
        return res.status(403).json({
            message: "Not metched User",
            data: false
        });
    }
    const { success, message, result, error } = yield service.bookmarkToggle(userId, placeId);
    success ?
        res.status(200).json({ message: message, data: result }) :
        res.status(500).json({ message: message, error: error });
});
exports.bookmarkToogle = bookmarkToogle;
