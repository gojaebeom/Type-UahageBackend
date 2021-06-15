"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOne = exports.findByOptions = exports.findAll = void 0;
const { queryBuilder } = require("../../../config/Database");
const log = require("../../../config/Logger");
// 모든 장소 보기
const findAll = () => {
    const query = `
    select id, name, address, phone, admission_fee , lat ,lon
    from p_kid_cafes;
    `;
    log.info(query);
    return queryBuilder(query)
        .then((data) => ({ success: true, message: "Get KidCafe list success", result: { total: data.rowCount, data: data.rows } }))
        .catch((error) => ({ success: false, message: "Get KidCafe list false", error: error }));
};
exports.findAll = findAll;
// 모든 장소 보기(10개 씩)
const findByOptions = (pageNumber, lat, lon) => {
    const query = `
    select id, name, address, phone, admission_fee , lat ,lon
    from p_kid_cafes
    order by  ST_DistanceSphere(geom, ST_MakePoint(${lon},${lat}))
    limit 10 offset ${pageNumber};
    `;
    log.info(query);
    return queryBuilder(query)
        .then((data) => ({ success: true, message: "Get KidCafe list success", result: { total: data.rowCount, data: data.rows } }))
        .catch((error) => ({ success: false, message: "Get KidCafe list false", error: error }));
};
exports.findByOptions = findByOptions;
// 장소 상세보기
const findOne = (placeId) => {
    const query = `
    select id, name, address, phone, admission_fee 
    from p_kid_cafes
    where id = ${placeId};`;
    return queryBuilder(query)
        .then((data) => ({ success: true, message: "Get KidCafe detail success", result: data.rows }))
        .catch((error) => ({ success: false, message: "Get KidCafe detail false", error: error }));
};
exports.findOne = findOne;
