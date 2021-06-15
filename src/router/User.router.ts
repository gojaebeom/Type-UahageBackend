"use strict";
import * as userController from "../app/controller/user/User.ctrl";
import { kakaoLoginMiddleware, naverLoginMiddleware } from "../middleware/Oauth.mdw";
import { authMiddleware } from "../middleware/Auth.mdw";
import { s3Middleware } from "../middleware/S3.mdw";
import { Router } from "express";


const router = Router();


/**@APIs 🍬*/
// User Api
// 🍩 카카오 로그인 ( 결과적으로 jwt 토큰 반환 , 기존에 계정 없으면 회원가입진행 이후 반환 )
router.post(
    "/api/users/kakao-login", 
    kakaoLoginMiddleware, 
    userController.oAuthLogin
);
// 🍑 네이버 로그인 ( 결과적으로 jwt 토큰 반환 , 기존에 계정 없으면 회원가입진행 이후 반환 )
router.post(
    "/api/users/naver-login", 
    naverLoginMiddleware, 
    userController.oAuthLogin
);
// 회원 로그아웃
router.get(
    "/api/users/logout", 
    authMiddleware, 
    userController.logout
);
// 회원 상세 정보
router.get(
    "/api/users/:id", 
    authMiddleware, 
    userController.findOne
);
// 회원 닉네임 확인 ( 있으면 false, 없으면 true )
router.get(
    "/api/users/validate-nickname/:nickname", 
    userController.validateByNickname
);
// 회원 이메일 확인
router.get(
    "/api/users/validate-email/:email",  
    userController.validateByEmail
);
// 회원 수정 ( 첫 회원가입 이후 추가정보 입력에도 사용 )
router.put(
    "/api/users/:id", 
    authMiddleware,
    s3Middleware, 
    userController.update
);
// 회원 탈퇴
router.delete(
    "/api/users/:id", 
    authMiddleware, 
    userController._delete
);

export default router;