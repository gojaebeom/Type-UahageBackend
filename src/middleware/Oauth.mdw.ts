import axios from "axios";
import { Request, Response } from "express";
import log from "../config/Logger";

export const naverLoginMiddleware = async (req: Request, res: Response, next: any) => {
    log.info("네이버 로그인 미들웨어 방문");
    try{
        const token = req.headers['authorization'];
        log.info(token);
        const userInfo = await axios.get("https://openapi.naver.com/v1/nid/me",{
            headers: { 
                'Authorization': `Bearer ${ token }`,
                'Content-type' : 'application/x-www-form-urlencoded;charset=utf-8'
            },
        })
        .then( res => res.data );
        log.info(userInfo);
        // NAVER.[이메일명]
        req.query.email = `NAVER.${userInfo.response.email}`;
        next();
    }catch( e ) {
        return res.status(403).json({ message:"naver access false" });
    }
}

export const kakaoLoginMiddleware = async (req: Request, res: Response, next: any) => {
    try{
        const token = req.headers['authorization'];
        log.info(token);
        const userInfo = await axios.get("https://kapi.kakao.com/v2/user/me",{
            headers: { 
                'Authorization': `Bearer ${ token }`,
                'Content-type' : 'application/x-www-form-urlencoded;charset=utf-8'
            },
        })
        .then( res => res.data );
        
        // KAKAO.[이메일명]
        req.query.email = `KAKAO.${userInfo.kakao_account.email}`;
        next();
    }catch( e ) {
        return res.status(403).json({ message:"kakao access false" });
    }
}