"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryBuilder = exports.connector = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
const Logger_1 = __importDefault(require("./Logger"));
dotenv_1.default.config();
const client = new pg_1.Client({
    host: process.env.PGSQL_HOST,
    user: process.env.PGSQL_USER,
    password: process.env.PGSQL_PASS,
    database: process.env.PGSQL_DB,
    port: Number(process.env.PGSQL_PORT),
    ssl: {
        rejectUnauthorized: false
    }
});
// DB 커넥터 : app.js에서 서버 실행시 호출
const connector = () => {
    client.connect(err => {
        if (err) {
            Logger_1.default.info(`Failed to connect db => ${err}`);
        }
        else {
            Logger_1.default.info("Connect to pg-db done!");
        }
    });
};
exports.connector = connector;
// 재사용성 쿼리빌더 : repository 에서 사용
const queryBuilder = (query, values) => {
    return new Promise((resolve, reject) => {
        client.query(query, values, (err, result) => {
            if (err)
                reject(err);
            else
                resolve(result);
        });
    });
};
exports.queryBuilder = queryBuilder;
