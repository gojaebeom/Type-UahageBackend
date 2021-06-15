import * as repository from "../../repository/place/ExperienceCenter.repo";

// 장소 리스트 보기
export const findByOptions = async ( pageNumber: any, lat: any, lon: any ) => {
    if(!pageNumber){
       // log.info("전체보기");
        return await repository.findAll();
    } else{
        //log.info("10개씩 끊어서 보기");
        return await repository.findByOptions(pageNumber,lat,lon);
    }
}

// 장소 상세보기
export const findOne = async ( placeId: any ) => 
    await repository.findOne( placeId );