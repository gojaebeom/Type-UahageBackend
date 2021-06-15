"use strict";
const { queryBuilder } = require("../../../config/Database");
const log = require("../../../config/Logger");

// 모든 장소 보기
export const findAll = () => {
    const query = `
    select id, name, address, phone, examination_items , lat ,lon
    from p_hospitals;
    `;

    log.info(query);
    return queryBuilder( query )
    .then( (data: any) => ({ success: true, message: "Get Hospital list success", result : { total : data.rowCount, data : data.rows} }))
    .catch( (error: any) => ({ success: false, message: "Get Hospital list false", error : error }));
}

// 모든 장소 보기(10개 씩)
export const findByOptions = (pageNumber: any, lat: any, lon: any) => {
    const query = `
    select id, name, address, phone, examination_items , lat ,lon
    from p_hospitals
    order by  ST_DistanceSphere(geom, ST_MakePoint(${lon},${lat}))
    limit 10 offset ${pageNumber};
    `;

    log.info(query);
    return queryBuilder( query )
    .then( (data: any) => ({ success: true, message: "Get Hospital list success", result : { total : data.rowCount, data : data.rows} }))
    .catch( (error: any) => ({ success: false, message: "Get Hospital list false", error : error }));
}

// 장소 상세보기
export const findOne = ( placeId: any ) => {
    const query = `
    select id, name, address, phone, examination_items
    from p_hospitals
    where id = ${placeId};
    `;
    return queryBuilder( query )
    .then( (data: any) => ({ success: true, message: "Get Hospital detail success", result : data.rows }))
    .catch( (error: any) => ({ success: false, message: "Get Hospital detail false", error : error }));
}
