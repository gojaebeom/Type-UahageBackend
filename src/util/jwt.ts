"use strict";
import jwt from "jsonwebtoken";
import log from "../config/Logger";

const secretKey: string = String(process.env.APP_SECRET);


// jwt 토큰 발행
export const createToken = ( userId: number ) => 
    jwt.sign({ uid: userId }, secretKey, { expiresIn: '1y' });


// jwt 토큰 해석
export const verifyToken = ( token: string ) => {
    let decoded: any;
    try {
        // verify를 통해 값 decode!
        decoded = jwt.verify(token, secretKey);
    } catch (err) {
        if (err.message === 'jwt expired') {
            log.info('expired token');
            return "EXPIRED";
        } else if (err.message === 'invalid token') {
            log.info('invalid token');
            return "INVALID";
        } else {
            log.info("invalid token");
            return "INVALID";
        }
    }
    return decoded || { uId : ""};
}