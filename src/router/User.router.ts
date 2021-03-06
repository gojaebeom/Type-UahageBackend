"use strict";
import * as userController from "../app/controller/user/User.ctrl";
import { kakaoLoginMiddleware, naverLoginMiddleware } from "../middleware/Oauth.mdw";
import { authMiddleware } from "../middleware/Auth.mdw";
import { s3Middleware } from "../middleware/S3.mdw";
import { Router } from "express";


const router = Router();


/**@APIs π¬*/
// User Api
// π© μΉ΄μΉ΄μ€ λ‘κ·ΈμΈ ( κ²°κ³Όμ μΌλ‘ jwt ν ν° λ°ν , κΈ°μ‘΄μ κ³μ  μμΌλ©΄ νμκ°μμ§ν μ΄ν λ°ν )
router.post(
    "/api/users/kakao-login", 
    kakaoLoginMiddleware, 
    userController.oAuthLogin
);
// π λ€μ΄λ² λ‘κ·ΈμΈ ( κ²°κ³Όμ μΌλ‘ jwt ν ν° λ°ν , κΈ°μ‘΄μ κ³μ  μμΌλ©΄ νμκ°μμ§ν μ΄ν λ°ν )
router.post(
    "/api/users/naver-login", 
    naverLoginMiddleware, 
    userController.oAuthLogin
);
// νμ λ‘κ·Έμμ
router.get(
    "/api/users/logout", 
    authMiddleware, 
    userController.logout
);
// νμ μμΈ μ λ³΄
router.get(
    "/api/users/:id", 
    authMiddleware, 
    userController.findOne
);
// νμ λλ€μ νμΈ ( μμΌλ©΄ false, μμΌλ©΄ true )
router.get(
    "/api/users/validate-nickname/:nickname", 
    userController.validateByNickname
);
// νμ μ΄λ©μΌ νμΈ
router.get(
    "/api/users/validate-email/:email",  
    userController.validateByEmail
);
// νμ μμ  ( μ²« νμκ°μ μ΄ν μΆκ°μ λ³΄ μλ ₯μλ μ¬μ© )
router.put(
    "/api/users/:id", 
    authMiddleware,
    s3Middleware, 
    userController.update
);
// νμ νν΄
router.delete(
    "/api/users/:id", 
    authMiddleware, 
    userController._delete
);

export default router;