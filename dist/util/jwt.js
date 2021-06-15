"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Logger_1 = __importDefault(require("../config/Logger"));
const secretKey = String(process.env.APP_SECRET);
// jwt 토큰 발행
const createToken = (userId) => jsonwebtoken_1.default.sign({ uid: userId }, secretKey, { expiresIn: '1y' });
exports.createToken = createToken;
// jwt 토큰 해석
const verifyToken = (token) => {
    let decoded;
    try {
        // verify를 통해 값 decode!
        decoded = jsonwebtoken_1.default.verify(token, secretKey);
    }
    catch (err) {
        if (err.message === 'jwt expired') {
            Logger_1.default.info('expired token');
            return "EXPIRED";
        }
        else if (err.message === 'invalid token') {
            Logger_1.default.info('invalid token');
            return "INVALID";
        }
        else {
            Logger_1.default.info("invalid token");
            return "INVALID";
        }
    }
    return decoded || { uId: "" };
};
exports.verifyToken = verifyToken;
