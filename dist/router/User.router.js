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
/**@APIs ๐ฌ*/
// User Api
// ๐ฉ ์นด์นด์ค ๋ก๊ทธ์ธ ( ๊ฒฐ๊ณผ์ ์ผ๋ก jwt ํ ํฐ ๋ฐํ , ๊ธฐ์กด์ ๊ณ์  ์์ผ๋ฉด ํ์๊ฐ์์งํ ์ดํ ๋ฐํ )
router.post("/api/users/kakao-login", Oauth_mdw_1.kakaoLoginMiddleware, userController.oAuthLogin);
// ๐ ๋ค์ด๋ฒ ๋ก๊ทธ์ธ ( ๊ฒฐ๊ณผ์ ์ผ๋ก jwt ํ ํฐ ๋ฐํ , ๊ธฐ์กด์ ๊ณ์  ์์ผ๋ฉด ํ์๊ฐ์์งํ ์ดํ ๋ฐํ )
router.post("/api/users/naver-login", Oauth_mdw_1.naverLoginMiddleware, userController.oAuthLogin);
// ํ์ ๋ก๊ทธ์์
router.get("/api/users/logout", Auth_mdw_1.authMiddleware, userController.logout);
// ํ์ ์์ธ ์ ๋ณด
router.get("/api/users/:id", Auth_mdw_1.authMiddleware, userController.findOne);
// ํ์ ๋๋ค์ ํ์ธ ( ์์ผ๋ฉด false, ์์ผ๋ฉด true )
router.get("/api/users/validate-nickname/:nickname", userController.validateByNickname);
// ํ์ ์ด๋ฉ์ผ ํ์ธ
router.get("/api/users/validate-email/:email", userController.validateByEmail);
// ํ์ ์์  ( ์ฒซ ํ์๊ฐ์ ์ดํ ์ถ๊ฐ์ ๋ณด ์๋ ฅ์๋ ์ฌ์ฉ )
router.put("/api/users/:id", Auth_mdw_1.authMiddleware, S3_mdw_1.s3Middleware, userController.update);
// ํ์ ํํด
router.delete("/api/users/:id", Auth_mdw_1.authMiddleware, userController._delete);
exports.default = router;
