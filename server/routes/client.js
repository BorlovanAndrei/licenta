import express from "express";
import {
    getPlans, 
    getMembers, 
    createPlan, 
    updatePlan, 
    deletePlan,
    createMember,
    updateMember,
    deleteMember
} from "../controllers/client.js"

const router = express.Router();

router.get("/plans", getPlans);
router.post("/plans", createPlan);
router.put("/plans/:id", updatePlan)
router.delete("/plans/:id", deletePlan)


router.get("/members", getMembers);
router.post("/members", createMember);
router.put("/members/:id", updateMember);
router.delete("/members/:id", deleteMember)

export default router;