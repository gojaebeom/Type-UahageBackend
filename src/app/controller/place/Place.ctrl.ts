import { Request, Response } from "express";
import * as service from "../../service/place/Place.service";

export const store = async (req: Request, res: Response) => {
    const body = req.body;
    const images =req.files;
    const {success, message, result, error}: any = await service.infoUpdatePropose( body, images );

    success ? 
    res.status(200).json({ message : message,  data : result }): 
    res.status(500).json({ message : message, error : error }); 
}