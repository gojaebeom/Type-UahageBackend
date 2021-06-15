"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOne = exports.findByOptions = exports.findAll = void 0;
const Database_1 = require("../../../config/Database");
const Logger_1 = __importDefault(require("../../../config/Logger"));
// 모든 장소 보기
const findAll = () => {
    const query = `
    select id, name, address, phone, admission_fee, lat, lon
    from p_experience_centers;
    `;
    Logger_1.default.info(query);
    return Database_1.queryBuilder(query, null)
        .then((data) => ({ success: true, message: "Get ExperienceCenter list success", result: { total: data.rowCount, data: data.rows } }))
        .catch(error => ({ success: false, message: "Get ExperienceCenter list false", error: error }));
};
exports.findAll = findAll;
// 모든 장소 보기(10개 씩)
const findByOptions = (pageNumber, lat, lon) => {
    const query = `
    select id, name, address, phone, admission_fee, lat, lon
    from p_experience_centers
    order by  ST_DistanceSphere(geom, ST_MakePoint(${lon},${lat}))
    limit 10 offset ${pageNumber};
    `;
    Logger_1.default.info(query);
    return Database_1.queryBuilder(query, null)
        .then((data) => ({ success: true, message: "Get ExperienceCenter list success", result: { total: data.rowCount, data: data.rows } }))
        .catch(error => ({ success: false, message: "Get ExperienceCenter list success", error: error }));
};
exports.findByOptions = findByOptions;
// 장소 상세보기
const findOne = (placeId) => {
    const query = `
    select id, name, address, phone, admission_fee, lat, lon
    from p_experience_centers
    where id = ${placeId};
    `;
    return Database_1.queryBuilder(query, null)
        .then((data) => ({ success: true, message: "Get ExperienceCenter detail success", result: data.rows }))
        .catch(error => ({ success: false, message: "Get ExperienceCenter detail false", error: error }));
};
exports.findOne = findOne;
