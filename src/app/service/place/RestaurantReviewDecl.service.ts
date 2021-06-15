import * as repository from "../../repository/place/Restaurant.repo";

//? 리뷰 신고
export const store = async ( body: any ) => await repository.storeReviewDeclarations( body );