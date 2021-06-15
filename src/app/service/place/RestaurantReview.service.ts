import { awsS3Delete } from "../../../config/AwsS3";
import log from "../../../config/Logger";
import * as repository from "../../repository/place/Restaurant.repo";

export const findByOptions = async ( placeId: any, type: any, order: any ) => {
    type = type !== null && type.toUpperCase();
    if( type === "IMG" ){
        return await repository.findReviewImages( placeId );
    }else {
        const option = order.toUpperCase();
        return await repository.findReviewsByOption( placeId, option );
    }
}

export const findOne = async ( reviewId: any ) => await repository.findOneReview( reviewId );

export const store = async ( body: any, images: any ) => {

    const tasteRating = Number(body.tasteRating);
    const costRating = Number(body.costRating);
    const serviceRating = Number(body.serviceRating);
    let totalRating: any = ( tasteRating + costRating + serviceRating ) / 3;
    totalRating = totalRating.toFixed(1);
    log.info(`맛:${ tasteRating}\n가격:${costRating}\n서비스레이팅:${serviceRating}\n토탈레이팅:${totalRating}`);

    if(!images.length){
        log.info("이미지 없음, 리뷰만 저장");
        return await repository.storeReview({
            userId : body.userId,
            placeId : body.placeId,
            desc : body.desc,
            totalRating : totalRating,
            tasteRating : tasteRating,
            costRating : costRating,
            serviceRating :serviceRating
        });
    } else {
        log.info("이미지 있음, 리뷰, 이미지 저장");
        return await repository.storeReviewWithImages({
            images : images,
            userId : body.userId,
            placeId : body.placeId,
            desc : body.desc,
            totalRating : totalRating,
            tasteRating : tasteRating,
            costRating : costRating,
            serviceRating :serviceRating
        });
    }
}

export const update = async ( reviewId: any, body: any, images: any ) => {

    const desc = body.desc;
    const tasteRating = Number(body.tasteRating);
    const costRating = Number(body.costRating);
    const serviceRating = Number(body.serviceRating);
    let totalRating: any = ( tasteRating + costRating + serviceRating ) / 3;
    totalRating = totalRating.toFixed(1);
    log.info(reviewId);
    log.info(`맛:${ tasteRating}\n가격:${costRating}\n서비스레이팅:${serviceRating}\n토탈레이팅:${totalRating}`);
    const deleteImgList = body.deleteImage;
    log.info( deleteImgList );


    let repoObj;
    if( deleteImgList ) {
        deleteImgList.map( async (item: any) => {
            repoObj = await repository.deleteReviewImage( item );
            log.info(`${ item } 이미지 삭제 완료`);

            awsS3Delete( item );
        });
    }

    if(!images.length){

        log.info("이미지 없음, 리뷰만 수정");
        return await repository.updateReview( reviewId , {
            desc : desc,
            totalRating : totalRating,
            tasteRating : tasteRating,
            costRating : costRating,
            serviceRating :serviceRating
        });  

    } else {
        log.info("이미지 있음, 리뷰수정 및 이미지 생성");
        repoObj = await repository.updateReview( reviewId , {
            desc : desc,
            totalRating : totalRating,
            tasteRating : tasteRating,
            costRating : costRating,
            serviceRating :serviceRating
        }); 
        if( !repoObj.success ) return repoObj;

        repoObj = await repository.storeReviewImages( reviewId, images);
    }

    return repoObj;
}

export const _delete = async ( reviewId: any) => {
    return await repository._delete( reviewId );
}

export const findUserIdByReviewId = async ( reviewId: any )  => await repository.findUserIdByReviewId( reviewId );