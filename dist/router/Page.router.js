"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
//? View Router
router.get("/", (req, res) => res.render("main"));
router.get("/maps", (req, res) => res.render("placeMainMap"));
router.get("/maps/show-place", (req, res) => res.render("placeListMap"));
router.get("/maps/show-place-name", (req, res) => res.render("placeDetailMap"));
router.get("/maps/show-list", (req, res) => res.render("placeListSearch"));
exports.default = router;
