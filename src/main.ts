//TODO : Import Module
import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import log from "./config/Logger";
import { connector } from "./config/Database";
import pageRouter from "./router/Page.router";
import placeRouter from "./router/Place.router";
import userRouter from "./router/User.router";

const app: Express = express();

//? Database Connection
connector();


//TODO : Middleware Connectings
//? Morgan Connection
const APP_MODE: string = process.env.APP_MODE || "DEV";
APP_MODE === "DEV" && app.use(morgan("dev"));

//? ejs 타입의 템플릿 앤진 사용 및 view, static 경로 설정
app.set("views", path.resolve(__dirname, "../public/views"));
app.set("view engine" , "ejs");
app.use(express.static(path.resolve(__dirname, "../public/static")));

//? Set Cors 
app.use(cors({
    origin:"*"
}));

//? Use json : req 객체에서 json 타입의 body 받기
app.use(express.json());

//? Use form-urlencoded : req 객체에서 x-www-form-urlencoded 타입의 body 받기
app.use(express.urlencoded({
    limit: '150mb',
    extended: false,
}));

// //? Set Router : router 연결
app.use(pageRouter);
app.use(placeRouter);
app.use(userRouter);

//? AppListening : 8000 포트에서 서버 실행
const PORT: string = process.env.APP_PORT || String(8000);

app.listen(PORT, () => log.info(`Server is running on : ${PORT}`));