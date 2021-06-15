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
exports.kakaoLoginMiddleware = exports.naverLoginMiddleware = void 0;
const axios_1 = __importDefault(require("axios"));
const Logger_1 = __importDefault(require("../config/Logger"));
const naverLoginMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    Logger_1.default.info("네이버 로그인 미들웨어 방문");
    try {
        const token = req.headers['authorization'];
        Logger_1.default.info(token);
        const userInfo = yield axios_1.default.get("https://openapi.naver.com/v1/nid/me", {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
        })
            .then(res => res.data);
        Logger_1.default.info(userInfo);
        // NAVER.[이메일명]
        req.query.email = `NAVER.${userInfo.response.email}`;
        next();
    }
    catch (e) {
        return res.status(403).json({ message: "naver access false" });
    }
});
exports.naverLoginMiddleware = naverLoginMiddleware;
const kakaoLoginMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers['authorization'];
        Logger_1.default.info(token);
        const userInfo = yield axios_1.default.get("https://kapi.kakao.com/v2/user/me", {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
        })
            .then(res => res.data);
        // KAKAO.[이메일명]
        req.query.email = `KAKAO.${userInfo.kakao_account.email}`;
        next();
    }
    catch (e) {
        return res.status(403).json({ message: "kakao access false" });
    }
});
exports.kakaoLoginMiddleware = kakaoLoginMiddleware;
