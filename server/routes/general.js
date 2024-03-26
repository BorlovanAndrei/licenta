import express from "express";
import {
    getTrainers,
    createTrainer,
    updateTrainer,
    deleteTrainer,
    signUp,
    logIn,
    logOut,
    createClass,
    editClass,
    deleteClasses,
    getClasses
} from "../controllers/general.js"


const router = express.Router();

router.get("/trainers", getTrainers);
router.post("/trainers", createTrainer);
router.put("/trainers/:id", updateTrainer);
router.delete("/trainers/:id", deleteTrainer);

router.get("/classes", getClasses);
router.post("/classes", createClass);
router.put("/classes/:id", editClass);
router.delete("/classes/:id", deleteClasses)

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/logout", logOut);

export default router;