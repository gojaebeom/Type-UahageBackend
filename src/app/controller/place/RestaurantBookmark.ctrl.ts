import { Request, Response } from "express";
import log from "../../../config/Logger";
import * as service from "../../service/place/RestaurantBookmark.service";


// 북마크 관계 생성, 또는 제거
export const bookmarkToogle = async (req: Request, res: Response) => {
    const tokenUserId = req.query.tokenUserId;
    const { userId, placeId } = req.body;

    //? 요청자/작성자 동일 판별
    if( Number(tokenUserId) !== Number(userId) ){
        log.info(`tokenUserId: ${userId}\nuserId: ${userId}`);
        return res.status(403).json({
            message: "Not metched User",
            data: false
        });
    }

    const { success, message, result, error } = await service.bookmarkToggle( userId, placeId );

    success ? 
    res.status(200).json({ message : message,  data : result }) : 
    res.status(500).json({ message : message, error : error }); 
}