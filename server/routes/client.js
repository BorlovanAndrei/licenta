import express from "express";
import {getPlans, getMembers} from "../controllers/client.js"

const router = express.Router();

router.get("/plans", getPlans);
// router.post("/plans", createPlan);
// router.put("/plans/:id", updatePlan)


router.get("/members", getMembers);

export default router;