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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOne = exports.findByOptions = void 0;
const service = __importStar(require("../../service/place/DayCareCenter.service"));
// 장소 리스트 보기
const findByOptions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageNumber, lat, lon } = req.query;
    const { success, message, result, error } = yield service.findByOptions(pageNumber, lat, lon);
    success ?
        res.status(200).json({ message: message, data: result }) :
        res.status(500).json({ message: message, error: error });
});
exports.findByOptions = findByOptions;
// 장소 상세보기
const findOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const placeId = req.params.id;
    const { success, message, result, error } = yield service.findOne(placeId);
    success ?
        res.status(200).json({ message: message, data: result }) :
        res.status(500).json({ message: message, error: error });
});
exports.findOne = findOne;
