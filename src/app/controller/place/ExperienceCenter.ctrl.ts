import { Request, Response } from "express";
import * as service from "../../service/place/ExperienceCenter.service";

// 장소 리스트 보기
export const findByOptions = async (req: Request, res: Response) => {
    const {pageNumber, lat, lon} = req.query;
    const {success, message, result, error}: any = await service.findByOptions( pageNumber, lat, lon );
    
    success ? 
    res.status(200).json({ message : message,  data : result }): 
    res.status(500).json({ message : message, error : error }); 
}

// 장소 상세보기
export const findOne = async (req: Request, res: Response) => {
    const placeId = req.params.id;
    const { success, message, result, error }: any = await service.findOne( placeId );

    success ? 
    res.status(200).json({ message : message, data : result }): 
    res.status(500).json({ message : message, error : error }); 
}