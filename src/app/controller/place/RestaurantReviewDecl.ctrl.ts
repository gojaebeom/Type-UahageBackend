import { Request, Response } from "express";
import log from "../../../config/Logger";
import * as service from "../../service/place/RestaurantReviewDecl.service";

//? 리뷰 신고
export const store = async (req: Request, res: Response) =>{
    const body = req.body;

    const { success, message, result, error }: any = await service.store( body );
    
    success ?
    res.status(200).json({ message : message, data : result }): 
    res.status(500).json({ message : message, error : error }); 
}