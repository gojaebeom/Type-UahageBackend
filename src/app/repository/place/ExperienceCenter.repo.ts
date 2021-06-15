import { queryBuilder } from "../../../config/Database";
import log from "../../../config/Logger";

// 모든 장소 보기
export const findAll = () => {
    const query = `
    select id, name, address, phone, admission_fee, lat, lon
    from p_experience_centers;
    `;

    log.info(query);
    return queryBuilder( query, null )
    .then( (data: any) => ({ success: true, message: "Get ExperienceCenter list success", result : { total : data.rowCount, data : data.rows} }))
    .catch( error => ({ success: false, message: "Get ExperienceCenter list false", error : error }));
}

// 모든 장소 보기(10개 씩)
export const findByOptions = (pageNumber: any, lat: any, lon: any) => {
    const query = `
    select id, name, address, phone, admission_fee, lat, lon
    from p_experience_centers
    order by  ST_DistanceSphere(geom, ST_MakePoint(${lon},${lat}))
    limit 10 offset ${pageNumber};
    `;

    log.info(query);
    return queryBuilder( query, null )
    .then( (data: any) => ({ success: true, message: "Get ExperienceCenter list success", result : { total : data.rowCount, data : data.rows} }))
    .catch( error => ({ success: false, message: "Get ExperienceCenter list success", error : error }));
}

// 장소 상세보기
export const findOne = ( placeId: any ) => {
    const query = `
    select id, name, address, phone, admission_fee, lat, lon
    from p_experience_centers
    where id = ${placeId};
    `;
    return queryBuilder( query, null )
    .then( (data: any) => ({ success: true, message: "Get ExperienceCenter detail success", result : data.rows }))
    .catch( error => ({ success: false, message: "Get ExperienceCenter detail false", error : error }));
}
