import { Client } from "pg";
import dotenv from "dotenv";
import log from "./Logger";

dotenv.config();

const client = new Client({
    host: process.env.PGSQL_HOST,
    user: process.env.PGSQL_USER,
    password: process.env.PGSQL_PASS,
    database: process.env.PGSQL_DB,
    port: Number(process.env.PGSQL_PORT),
    ssl: {
        rejectUnauthorized : false
    }
});

// DB 커넥터 : app.js에서 서버 실행시 호출
export const connector = () => {
    client.connect(err => { 
        if (err) {
            log.info(`Failed to connect db => ${err}`);
        } else {
            log.info("Connect to pg-db done!");
        } 
    });
}

// 재사용성 쿼리빌더 : repository 에서 사용
export const queryBuilder = ( query: string, values: any ) => {
    return new Promise((resolve, reject) => {
        client.query( query, values, ( err, result ) => {
            if(err) reject(err);
            else resolve(result);
        });
    });
}