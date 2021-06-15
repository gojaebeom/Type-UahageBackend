"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const Logger_1 = __importDefault(require("../config/Logger"));
const jwt_1 = require("../util/jwt");
//? 유효한 [Access Token 을 가지고 있는지 확인]
const authMiddleware = (req, res, next) => {
    const token = String(req.headers["authorization"]);
    const result = jwt_1.verifyToken(token);
    Logger_1.default.info(result);
    if (result === "INVALID") {
        return res.status(403).json({
            message: "Invalid token",
            data: "INVALID",
        });
    }
    else if (result === "EXPIRED") {
        return res.status(403).json({
            message: "Expired token",
            data: "EXPIRED",
        });
    }
    req.query.tokenUserId = String(result.uid);
    next();
};
exports.authMiddleware = authMiddleware;
