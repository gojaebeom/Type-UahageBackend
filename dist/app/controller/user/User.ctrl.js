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
Object.defineProperty(exports, "__esModule", { value: true });
exports._delete = exports.logout = exports.validateByEmail = exports.validateByNickname = exports.update = exports.findOne = exports.oAuthLogin = void 0;
const log = require("../../../config/Logger");
const service = require("../../service/user/User.service");
// 카카오, 네이버 소셜 로그인 ( 인증 미들웨어가 카카오, 네이버로 구분되어 각각 다른 Email 값을 반환)
const oAuthLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    const body = req.body;
    const { success, message, result, error } = yield service.oAuthLogin(email, body);
    success ?
        res.status(200).json({ message: message, data: result }) :
        res.status(500).json({ message: message, error: error });
});
exports.oAuthLogin = oAuthLogin;
// 회원 상세정보
const findOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const { success, message, result, error } = yield service.findOne(userId);
    success ?
        res.status(200).json({ message: message, data: result }) :
        res.status(500).json({ message: message, error: error });
});
exports.findOne = findOne;
// 회원 정보 수정
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUserId = req.query.tokenUserId;
    const userId = req.params.id;
    const body = req.body;
    //? 요청자/작성자 동일 판별
    if (Number(tokenUserId) !== Number(userId)) {
        log.info(`tokenUserId: ${userId}\nuserId: ${userId}`);
        return res.status(403).json({
            message: "Not metched User",
            data: false
        });
    }
    const { success, message, result, error } = yield service.update(userId, body);
    success ?
        res.status(200).json({ message: message, data: result }) :
        res.status(500).json({ message: message, error: error });
});
exports.update = update;
// 닉네임 중복채크
const validateByNickname = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nickname = req.params.nickname;
    const { success, message, result, error } = yield service.validateByNickname(nickname);
    success ?
        res.status(200).json({ message: message, data: result }) :
        res.status(500).json({ message: message, error: error });
});
exports.validateByNickname = validateByNickname;
// 이메일 중복채크
const validateByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    const { success, message, result, error } = yield service.validateByEmail(email);
    success ?
        res.status(200).json({ message: message, data: result }) :
        res.status(500).json({ message: message, error: error });
});
exports.validateByEmail = validateByEmail;
// 회원 로그아웃 ( 미완료 )
const logout = (req, res) => {
    // 소셜로그인 토큰 인증방식에 따라 구현
    // 1. 소셜 로그인마다 받는 토큰과 리프레시 토큰이 다른경우
    // DB에 저장된 리프레시 토큰을 지우고 토큰 만료시키기
    // 2. 세션 방식일 경우 세션을 삭제 시키기
    res.status(200).json({ message: "status ok", data: true });
};
exports.logout = logout;
// 회원 탈퇴 
const _delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUserId = req.query.tokenUserId;
    const userId = req.params.id;
    //? 요청자/작성자 동일 판별
    if (Number(tokenUserId) !== Number(userId)) {
        log.info(`tokenUserId: ${userId}\nuserId: ${userId}`);
        return res.status(403).json({
            message: "Not metched User",
            data: false
        });
    }
    const { success, message, result, error } = yield service.delete(userId);
    success ?
        res.status(200).json({ message: message, data: result }) :
        res.status(500).json({ message: message, error: error });
});
exports._delete = _delete;
