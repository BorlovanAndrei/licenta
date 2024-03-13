import express from "express";
import {getPlans} from "../controllers/client.js"

const router = express.Router();

router.get("/plans", getPlans);
//router.post("/plans", createPlan);

export default router;