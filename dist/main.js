"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//TODO : Import Module
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const Logger_1 = __importDefault(require("./config/Logger"));
const Database_1 = require("./config/Database");
const Page_router_1 = __importDefault(require("./router/Page.router"));
const Place_router_1 = __importDefault(require("./router/Place.router"));
const User_router_1 = __importDefault(require("./router/User.router"));
const app = express_1.default();
//? Database Connection
Database_1.connector();
//TODO : Middleware Connectings
//? Morgan Connection
const APP_MODE = process.env.APP_MODE || "DEV";
APP_MODE === "DEV" && app.use(morgan_1.default("dev"));
//? ejs 타입의 템플릿 앤진 사용 및 view, static 경로 설정
app.set("views", path_1.default.resolve(__dirname, "../public/views"));
app.set("view engine", "ejs");
app.use(express_1.default.static(path_1.default.resolve(__dirname, "../public/static")));
//? Set Cors 
app.use(cors_1.default({
    origin: "*"
}));
//? Use json : req 객체에서 json 타입의 body 받기
app.use(express_1.default.json());
//? Use form-urlencoded : req 객체에서 x-www-form-urlencoded 타입의 body 받기
app.use(express_1.default.urlencoded({
    limit: '150mb',
    extended: false,
}));
// //? Set Router : router 연결
app.use(Page_router_1.default);
app.use(Place_router_1.default);
app.use(User_router_1.default);
//? AppListening : 8000 포트에서 서버 실행
const PORT = process.env.APP_PORT || String(8000);
app.listen(PORT, () => Logger_1.default.info(`Server is running on : ${PORT}`));
