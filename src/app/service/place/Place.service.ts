import log from "../../../config/Logger";
import * as repository from "../../repository/place/Place.repo";

export const infoUpdatePropose = async ( body: any , images: any) => {

    if(!images.length){
        log.info("이미지 없음, 리뷰만 저장");
        return await  repository.infoUpdatePropose( body );
    } else {
        log.info("이미지 있음, 리뷰, 이미지 저장");
        return await  repository.infoUpdateProposeWithImages( body, images );
    }
}
