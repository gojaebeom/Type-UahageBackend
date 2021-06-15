"use strict";

import { Request, Response } from "express";

const log = require("../../../config/Logger");
const service = require("../../service/user/User.service");

// 카카오, 네이버 소셜 로그인 ( 인증 미들웨어가 카카오, 네이버로 구분되어 각각 다른 Email 값을 반환)
export const oAuthLogin = async (req: Request, res: Response) => {
    const email = req.query.email;
    const body = req.body;
    const {success, message, result, error }: any = await service.oAuthLogin( email, body );

    success ? 
    res.status(200).json({ message : message,  data : result }) : 
    res.status(500).json({ message : message, error : error }); 
}


// 회원 상세정보
export const findOne = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { success, message, result, error }: any = await service.findOne( userId );

    success ? 
    res.status(200).json({ message : message, data : result }) : 
    res.status(500).json({ message : message, error : error }); 
}


// 회원 정보 수정
export const update = async (req: Request, res: Response) => {
    const tokenUserId = req.query.tokenUserId;
    const userId = req.params.id;
    const body = req.body;

    //? 요청자/작성자 동일 판별
    if( Number(tokenUserId) !== Number(userId) ){
        log.info(`tokenUserId: ${userId}\nuserId: ${userId}`);
        return res.status(403).json({
            message: "Not metched User",
            data: false
        });
    }

    const { success, message, result, error }: any = await service.update( userId, body ); 

    success ? 
    res.status(200).json({ message : message,  data : result }) : 
    res.status(500).json({ message : message, error : error }); 
}


// 닉네임 중복채크
export const validateByNickname = async (req: Request, res: Response) => { 
    const nickname = req.params.nickname;
    const { success, message, result, error }: any = await service.validateByNickname( nickname ); 
    
    success ? 
    res.status(200).json({ message : message, data : result }): 
    res.status(500).json({ message : message, error : error }); 
}


// 이메일 중복채크
export const validateByEmail = async (req: Request, res: Response) => { 
    const email = req.params.email; 
    const { success, message, result, error }: any = await service.validateByEmail( email ); 
    success ? 
    res.status(200).json({ message : message, data : result }) : 
    res.status(500).json({ message : message, error : error }); 
}


// 회원 로그아웃 ( 미완료 )
export const logout = (req: Request, res: Response) => {
    // 소셜로그인 토큰 인증방식에 따라 구현
    // 1. 소셜 로그인마다 받는 토큰과 리프레시 토큰이 다른경우
    // DB에 저장된 리프레시 토큰을 지우고 토큰 만료시키기
    // 2. 세션 방식일 경우 세션을 삭제 시키기
    res.status(200).json({ message : "status ok",  data : true });
}


// 회원 탈퇴 
export const _delete = async (req: Request, res: Response) => {
    const tokenUserId = req.query.tokenUserId;
    const userId = req.params.id;

    //? 요청자/작성자 동일 판별
    if( Number(tokenUserId) !== Number(userId) ){
        log.info(`tokenUserId: ${userId}\nuserId: ${userId}`);
        return res.status(403).json({
            message: "Not metched User",
            data: false
        });
    }

    const { success, message, result, error }: any = await service.delete( userId );

    success ? 
    res.status(200).json({ message : message, data : result }): 
    res.status(500).json({ message : message, error : error }); 
}
