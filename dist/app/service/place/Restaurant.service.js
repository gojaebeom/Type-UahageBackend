"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOne = exports.findByOptions = void 0;
const Logger_1 = __importDefault(require("../../../config/Logger"));
const repository = __importStar(require("../../repository/place/Restaurant.repo"));
const findByOptions = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageNumber } = options;
    if (!pageNumber) {
        Logger_1.default.info("전체 보기");
        for (let option in options) {
            if (options[option] === "0") {
                options[option] = false;
            }
        }
        return yield repository.findAll(options);
    }
    else {
        Logger_1.default.info("10개씩 끊어서 보기");
        return yield repository.findByOptions(options);
    }
});
exports.findByOptions = findByOptions;
const findOne = (placeId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield repository.findOne(placeId);
});
exports.findOne = findOne;
