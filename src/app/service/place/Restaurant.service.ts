import log from "../../../config/Logger";
import * as repository from "../../repository/place/Restaurant.repo";

export const findByOptions = async ( options: any ) => {
    const {pageNumber} = options;

    if(!pageNumber){
        log.info("전체 보기");
        for(let option in options) {
            if(options[option] === "0"){
                options[option] = false;
            }
        }
        return await repository.findAll(options);
    } else{
        log.info("10개씩 끊어서 보기");
        return await repository.findByOptions(options);
    }
}

export const findOne = async ( placeId: any ) => {
    return await repository.findOne( placeId );
}