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
const repository = __importStar(require("../../repository/user/User.repo"));
const jwt_1 = require("../../../util/jwt");
const Logger_1 = __importDefault(require("../../../config/Logger"));
exports.oAuthLogin = (email, body) => __awaiter(void 0, void 0, void 0, function* () {
    //? 이메일로 저장된 유저 아이디 확인 : 있으면 유저 아이디 반환, 없으면 0 반환
    let repoObject = yield repository.findIdByEmail(email);
    if (!repoObject.success)
        return repoObject;
    //? 이메일이 저장되지 않은 유저는 회원 정보 저장
    if (repoObject.result === 0) {
        // store!
        const { nickname, ageGroupType, babyGender, babyBirthday } = body;
        repoObject = yield repository.store(email, nickname, ageGroupType, babyGender, babyBirthday);
        if (!repoObject.success)
            return repoObject;
        repoObject = yield repository.findIdByEmail(email);
        if (!repoObject.success)
            return repoObject;
    }
    //? 이후 토큰 발급
    const userId = repoObject.result.id;
    const jwtToken = jwt_1.createToken(userId);
    Logger_1.default.info(jwtToken);
    return { success: true, message: repoObject.message, result: { token: jwtToken } };
});
// 회원 상세정보
exports.findOne = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.findOne(userId); });
exports.update = (userId, body) => __awaiter(void 0, void 0, void 0, function* () {
    const { nickname, ageGroupType, babyGender, babyBirthday } = body;
    return yield repository.edit(userId, nickname, ageGroupType, babyGender, babyBirthday);
});
// 닉네임 중복채크
exports.validateByNickname = (nickname) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.validateByNickname(nickname); });
// 이메일 중복채크
exports.validateByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.validateByEmail(email); });
// 회원 탈퇴 
exports.delete = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.deleteStepOne(userId); });
