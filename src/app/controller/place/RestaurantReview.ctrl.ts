import * as service from "../../service/place/RestaurantReview.service";
import log from "../../../config/Logger";
import { Request, Response } from "express";


//? 리뷰 리스트 보기
export const findByOptions = async (req: Request, res: Response) => {
    const placeId = req.params.id;
    let type = req.query.type || null;
    const order = req.query.order || "DATE"; // date, top, low

    const { success, message, result, error }: any = await service.findByOptions( placeId, type, order ); 
    
    success ? 
    res.status(200).json({ message : message, data : result }) : 
    res.status(500).json({ message : message, error : error }); 
}


//? 리뷰 상세보기
export const findOne = async (req: Request, res: Response) =>{
    const reviewId = req.params.id;
    const { success, message, result, error }: any = await service.findOne( reviewId );

    success ? 
    res.status(200).json({ message : message, data : result }) : 
    res.status(500).json({ message : message, error : error }); 
}


//? 리뷰 생성
export const store = async (req: Request, res: Response) => {
    log.info(`Request Review Store`);
    
    const body = req.body;
    
    const imgFiles =req.files;
    const { userId } = body;
    const tokenUserId = req.query.tokenUserId;

    //? 요청자/작성자 동일 판별
    if( Number(tokenUserId) !== Number(userId) ){
        log.info(`tokenUserId: ${userId}\nuserId: ${userId}`);
        return res.status(403).json({
            message: "Not metched User",
            data: false
        });
    }

    const { success, message, result, error } = await service.store( body, imgFiles);

    success ? 
    res.status(200).json({ message : message,  data : result }) : 
    res.status(500).json({ message : message, error : error }); 
}


//? 리뷰 수정하기
export const update = async (req: Request, res: Response) =>{
    const reviewId = req.params.id;
    const body = req.body;
    log.info( body );
    const images = req.files;

    const { userId } = body;
    const tokenUserId = req.query.tokenUserId;

    //? 요청자/작성자 동일 판별
    if( Number(tokenUserId) !== Number(userId) ){
        log.info(`tokenUserId: ${userId}\nuserId: ${userId}`);
        return res.status(403).json({
            message: "Not metched User",
            data: false
        });
    }

    const { success, message, result, error }: any = await service.update( reviewId, body, images );

    success ? 
    res.status(200).json({ message : message,  data : result }) :
    res.status(500).json({ message : message, error : error }); 
}


//? 리뷰 삭제
export const _delete = async (req: Request, res: Response) => {
    const reviewId = req.params.id;

    let serviceObj = await service.findUserIdByReviewId( reviewId );
    const userId = serviceObj.result || 0;

    if( !serviceObj.success ) return res.status(500).json({ message: serviceObj.message, error: serviceObj.error });

    const tokenUserId = req.query.tokenUserId;

    //? 요청자/작성자 동일 판별
    if( Number(tokenUserId) !== Number(serviceObj.result) ){
        log.info(`tokenUserId: ${userId}\nuserId: ${userId}`);
        return res.status(403).json({
            message: "Not metched User",
            data: false
        });
    }

    
    let { success, message, result, error } = await service._delete( reviewId );

    success ? 
    res.status(200).json({ message: message, data: result }) : 
    res.status(500).json({ message: message, error: error }); 
}


