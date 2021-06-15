

import * as restaurantController from "../app/controller/place/Restaurant.ctrl";
import * as restaurantBookmarkController from "../app/controller/place/RestaurantBookmark.ctrl";
import * as restaurantReviewController from "../app/controller/place/RestaurantReview.ctrl";
import * as restaurantReviewDeclController from "../app/controller/place/RestaurantReviewDecl.ctrl";
import * as placeController from "../app/controller/place/Place.ctrl";

import * as dayCareCenterController from "../app//controller/place/DayCareCenter.ctrl";
import * as hospitalController from "../app/controller/place/Hospital.ctrl";
import * as experienceCenterController from "../app/controller/place/ExperienceCenter.ctrl";
import * as kidCafeController from "../app/controller/place/KidCafe.ctrl";

/**@ImportMiddlewares 🍇 */
import { s3MultiFileMiddleware } from "../middleware/S3.mdw";
import { Router } from "express";
import { authMiddleware } from "../middleware/Auth.mdw";



const router = Router();

// 정보수정 제안하기
router.post(
    "/api/places/propose",
    authMiddleware,
    s3MultiFileMiddleware,
    placeController.store
)

//? rstr
router.post(
    "/api/places/restaurants/bookmarks", 
    authMiddleware,
    restaurantBookmarkController.bookmarkToogle
);
router.get(
    "/api/places/restaurants", 
    authMiddleware,
    restaurantController.findByOptions
);
router.get(
    "/api/places/restaurants/:id", 
    authMiddleware,
    restaurantController.findOne
);

//? rstr review
router.get(
    "/api/places/restaurants/:id/reviews", 
    authMiddleware,
    restaurantReviewController.findByOptions
);
router.get(
    "/api/places/restaurants/reviews/:id", 
    authMiddleware,
    restaurantReviewController.findOne
);
router.post(
    "/api/places/restaurants/reviews",
    authMiddleware,
    s3MultiFileMiddleware,
    restaurantReviewController.store
);
router.put(
    "/api/places/restaurants/reviews/:id",
    authMiddleware,
    s3MultiFileMiddleware,
    restaurantReviewController.update
);
router.delete(
    "/api/places/restaurants/reviews/:id",
    authMiddleware,
    restaurantReviewController._delete
);
router.post(
    "/api/places/restaurants/reviews/decl",
    authMiddleware,
    restaurantReviewDeclController.store
);


// Place-dayCareCenter
router.get(
    "/api/places/day-care-centers", 
    authMiddleware,
    dayCareCenterController.findByOptions
);
router.get(
    "/api/places/day-care-centers/:id",
    authMiddleware,
    dayCareCenterController.findOne
);



// Place-hospital
router.get(
    "/api/places/hospitals", 
    authMiddleware,
    hospitalController.findByOptions
);
router.get(
    "/api/places/hospitals/:id", 
    authMiddleware,
    hospitalController.findOne
);



// Place-experienceCenter
router.get(
    "/api/places/experience-centers", 
    authMiddleware,
    experienceCenterController.findByOptions
);
router.get(
    "/api/places/experience-centers/:id", 
    authMiddleware,
    experienceCenterController.findOne
);


// Place-kidCafe
router.get(
    "/api/places/kid-cafes", 
    authMiddleware,
    kidCafeController.findByOptions
);
router.get(
    "/api/places/kid-cafes/:id", 
    authMiddleware,
    kidCafeController.findOne
);

export default router;