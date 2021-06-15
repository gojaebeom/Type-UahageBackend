import { Request, Response } from "express";
import log from "../config/Logger";
import { verifyToken } from "../util/jwt";

//? 유효한 [Access Token 을 가지고 있는지 확인]
export const authMiddleware = (req: Request, res: Response, next: any) => {

    const token: string = String(req.headers["authorization"]);
    const result = verifyToken( token );

    log.info( result );

    if( result === "INVALID" ){
        return res.status(403).json({
            message :"Invalid token",
            data : "INVALID",
        });
    } else if( result === "EXPIRED"){
        return res.status(403).json({
            message :"Expired token",
            data : "EXPIRED",
        });
    }

    req.query.tokenUserId = String(result.uid);

    next();
}