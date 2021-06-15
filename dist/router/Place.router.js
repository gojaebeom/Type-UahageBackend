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
Object.defineProperty(exports, "__esModule", { value: true });
const restaurantController = __importStar(require("../app/controller/place/Restaurant.ctrl"));
const restaurantBookmarkController = __importStar(require("../app/controller/place/RestaurantBookmark.ctrl"));
const restaurantReviewController = __importStar(require("../app/controller/place/RestaurantReview.ctrl"));
const restaurantReviewDeclController = __importStar(require("../app/controller/place/RestaurantReviewDecl.ctrl"));
const placeController = __importStar(require("../app/controller/place/Place.ctrl"));
const dayCareCenterController = __importStar(require("../app//controller/place/DayCareCenter.ctrl"));
const hospitalController = __importStar(require("../app/controller/place/Hospital.ctrl"));
const experienceCenterController = __importStar(require("../app/controller/place/ExperienceCenter.ctrl"));
const kidCafeController = __importStar(require("../app/controller/place/KidCafe.ctrl"));
/**@ImportMiddlewares 🍇 */
const S3_mdw_1 = require("../middleware/S3.mdw");
const express_1 = require("express");
const Auth_mdw_1 = require("../middleware/Auth.mdw");
const router = express_1.Router();
// 정보수정 제안하기
router.post("/api/places/propose", Auth_mdw_1.authMiddleware, S3_mdw_1.s3MultiFileMiddleware, placeController.store);
//? rstr
router.post("/api/places/restaurants/bookmarks", Auth_mdw_1.authMiddleware, restaurantBookmarkController.bookmarkToogle);
router.get("/api/places/restaurants", Auth_mdw_1.authMiddleware, restaurantController.findByOptions);
router.get("/api/places/restaurants/:id", Auth_mdw_1.authMiddleware, restaurantController.findOne);
//? rstr review
router.get("/api/places/restaurants/:id/reviews", Auth_mdw_1.authMiddleware, restaurantReviewController.findByOptions);
router.get("/api/places/restaurants/reviews/:id", Auth_mdw_1.authMiddleware, restaurantReviewController.findOne);
router.post("/api/places/restaurants/reviews", Auth_mdw_1.authMiddleware, S3_mdw_1.s3MultiFileMiddleware, restaurantReviewController.store);
router.put("/api/places/restaurants/reviews/:id", Auth_mdw_1.authMiddleware, S3_mdw_1.s3MultiFileMiddleware, restaurantReviewController.update);
router.delete("/api/places/restaurants/reviews/:id", Auth_mdw_1.authMiddleware, restaurantReviewController._delete);
router.post("/api/places/restaurants/reviews/decl", Auth_mdw_1.authMiddleware, restaurantReviewDeclController.store);
// Place-dayCareCenter
router.get("/api/places/day-care-centers", Auth_mdw_1.authMiddleware, dayCareCenterController.findByOptions);
router.get("/api/places/day-care-centers/:id", Auth_mdw_1.authMiddleware, dayCareCenterController.findOne);
// Place-hospital
router.get("/api/places/hospitals", Auth_mdw_1.authMiddleware, hospitalController.findByOptions);
router.get("/api/places/hospitals/:id", Auth_mdw_1.authMiddleware, hospitalController.findOne);
// Place-experienceCenter
router.get("/api/places/experience-centers", Auth_mdw_1.authMiddleware, experienceCenterController.findByOptions);
router.get("/api/places/experience-centers/:id", Auth_mdw_1.authMiddleware, experienceCenterController.findOne);
// Place-kidCafe
router.get("/api/places/kid-cafes", Auth_mdw_1.authMiddleware, kidCafeController.findByOptions);
router.get("/api/places/kid-cafes/:id", Auth_mdw_1.authMiddleware, kidCafeController.findOne);
exports.default = router;
