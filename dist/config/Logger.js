"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const app_root_path_1 = __importDefault(require("app-root-path"));
const process_1 = __importDefault(require("process"));
const logDir = `${app_root_path_1.default}/logs`;
const { combine, timestamp, label, printf, } = winston_1.default.format;
const logFormat = printf(({ level, message, label, timestamp }) => {
    return `s${timestamp} [${label} ${level}: ${message}]`;
});
const log = winston_1.default.createLogger({
    format: combine(label({
        label: "UahageProject"
    }), timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
    }), logFormat // 로그 출력 포멧
    ),
    transports: [
        new winston_daily_rotate_file_1.default({
            level: "info",
            datePattern: "YYYY-MM-DD",
            dirname: logDir,
            filename: "%DATE%.log",
            maxFiles: 30,
            zippedArchive: true
        }),
        new winston_daily_rotate_file_1.default({
            level: "error",
            datePattern: "YYYY-MM-DD",
            dirname: logDir,
            filename: "%DATE%.error.log",
            maxFiles: 30,
            zippedArchive: true
        })
    ],
    exceptionHandlers: [
        new winston_daily_rotate_file_1.default({
            level: "error",
            datePattern: "YYYY-MM-DD",
            dirname: logDir,
            filename: "%DATE%.exception.log",
            maxFiles: 30,
            zippedArchive: true
        })
    ]
});
if (process_1.default.env.APP_MODE !== "PROD") {
    log.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple())
    }));
}
exports.default = log;
