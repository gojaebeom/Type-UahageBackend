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
Object.defineProperty(exports, "__esModule", { value: true });
const userController = __importStar(require("../app/controller/user/User.ctrl"));
const Oauth_mdw_1 = require("../middleware/Oauth.mdw");
const Auth_mdw_1 = require("../middleware/Auth.mdw");
const S3_mdw_1 = require("../middleware/S3.mdw");
const express_1 = require("express");
const router = express_1.Router();
/**@APIs 🍬*/
// User Api
// 🍩 카카오 로그인 ( 결과적으로 jwt 토큰 반환 , 기존에 계정 없으면 회원가입진행 이후 반환 )
router.post("/api/users/kakao-login", Oauth_mdw_1.kakaoLoginMiddleware, userController.oAuthLogin);
// 🍑 네이버 로그인 ( 결과적으로 jwt 토큰 반환 , 기존에 계정 없으면 회원가입진행 이후 반환 )
router.post("/api/users/naver-login", Oauth_mdw_1.naverLoginMiddleware, userController.oAuthLogin);
// 회원 로그아웃
router.get("/api/users/logout", Auth_mdw_1.authMiddleware, userController.logout);
// 회원 상세 정보
router.get("/api/users/:id", Auth_mdw_1.authMiddleware, userController.findOne);
// 회원 닉네임 확인 ( 있으면 false, 없으면 true )
router.get("/api/users/validate-nickname/:nickname", userController.validateByNickname);
// 회원 이메일 확인
router.get("/api/users/validate-email/:email", userController.validateByEmail);
// 회원 수정 ( 첫 회원가입 이후 추가정보 입력에도 사용 )
router.put("/api/users/:id", Auth_mdw_1.authMiddleware, S3_mdw_1.s3Middleware, userController.update);
// 회원 탈퇴
router.delete("/api/users/:id", Auth_mdw_1.authMiddleware, userController._delete);
exports.default = router;
