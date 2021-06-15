import { Request, Response, Router } from "express";


const router: Router = Router();

//? View Router
router.get("/", (req: Request, res: Response) => res.render("main"));
router.get("/maps", (req: Request, res: Response) => res.render("placeMainMap")); 
router.get("/maps/show-place", (req: Request, res: Response) => res.render("placeListMap"));
router.get("/maps/show-place-name", (req: Request, res: Response) => res.render("placeDetailMap"));
router.get("/maps/show-list", (req: Request, res: Response) => res.render("placeListSearch"));


export default router;
