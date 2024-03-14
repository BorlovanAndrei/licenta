import express from "express";
import {getPlans, getMembers, createPlan, updatePlan, deletePlan} from "../controllers/client.js"

const router = express.Router();

router.get("/plans", getPlans);
router.post("/plans", createPlan);
router.put("/plans/:id", updatePlan)
router.delete("/plans/:id", deletePlan)


router.get("/members", getMembers);

export default router;