"use strict";
const { queryBuilder } = require("../../../config/Database");
const log = require("../../../config/Logger");

// 모든 장소 보기
export const findAll = () => {
    const query = `
    select id, name, address, phone, admission_fee , lat ,lon
    from p_kid_cafes;
    `;

    log.info(query);
    return queryBuilder( query )
    .then( (data: any) => ({ success: true, message: "Get KidCafe list success", result : { total : data.rowCount, data : data.rows} }))
    .catch( (error: any) => ({ success: false,  message: "Get KidCafe list false", error : error }));
}

// 모든 장소 보기(10개 씩)
export const findByOptions = (pageNumber: any, lat: any, lon: any) => {
    const query = `
    select id, name, address, phone, admission_fee , lat ,lon
    from p_kid_cafes
    order by  ST_DistanceSphere(geom, ST_MakePoint(${lon},${lat}))
    limit 10 offset ${pageNumber};
    `;

    log.info(query);
    return queryBuilder( query )
    .then( (data: any) => ({ success: true,  message: "Get KidCafe list success", result : { total : data.rowCount, data : data.rows} }))
    .catch( (error: any) => ({ success: false,  message: "Get KidCafe list false", error : error }));
}

// 장소 상세보기
export const findOne = ( placeId: any ) => {
    const query = `
    select id, name, address, phone, admission_fee 
    from p_kid_cafes
    where id = ${placeId};`;
    return queryBuilder( query )
    .then( (data: any) => ({ success: true,  message: "Get KidCafe detail success", result : data.rows }))
    .catch( (error: any) => ({ success: false,  message: "Get KidCafe detail false", error : error }));
}
