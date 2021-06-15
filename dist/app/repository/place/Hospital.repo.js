"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOne = exports.findByOptions = exports.findAll = void 0;
const { queryBuilder } = require("../../../config/Database");
const log = require("../../../config/Logger");
// 모든 장소 보기
const findAll = () => {
    const query = `
    select id, name, address, phone, examination_items , lat ,lon
    from p_hospitals;
    `;
    log.info(query);
    return queryBuilder(query)
        .then((data) => ({ success: true, message: "Get Hospital list success", result: { total: data.rowCount, data: data.rows } }))
        .catch((error) => ({ success: false, message: "Get Hospital list false", error: error }));
};
exports.findAll = findAll;
// 모든 장소 보기(10개 씩)
const findByOptions = (pageNumber, lat, lon) => {
    const query = `
    select id, name, address, phone, examination_items , lat ,lon
    from p_hospitals
    order by  ST_DistanceSphere(geom, ST_MakePoint(${lon},${lat}))
    limit 10 offset ${pageNumber};
    `;
    log.info(query);
    return queryBuilder(query)
        .then((data) => ({ success: true, message: "Get Hospital list success", result: { total: data.rowCount, data: data.rows } }))
        .catch((error) => ({ success: false, message: "Get Hospital list false", error: error }));
};
exports.findByOptions = findByOptions;
// 장소 상세보기
const findOne = (placeId) => {
    const query = `
    select id, name, address, phone, examination_items
    from p_hospitals
    where id = ${placeId};
    `;
    return queryBuilder(query)
        .then((data) => ({ success: true, message: "Get Hospital detail success", result: data.rows }))
        .catch((error) => ({ success: false, message: "Get Hospital detail false", error: error }));
};
exports.findOne = findOne;
