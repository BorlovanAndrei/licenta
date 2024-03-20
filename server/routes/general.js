import express from "express";
import {
    getTrainers,
    createTrainer,
    updateTrainer,
    deleteTrainer
} from "../controllers/general.js"


const router = express.Router();

router.get("/trainers", getTrainers);
router.post("/trainers", createTrainer);
router.put("/trainers/:id", updateTrainer);
router.delete("/trainers/:id", deleteTrainer)

export default router;