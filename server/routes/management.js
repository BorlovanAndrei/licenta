import express from "express";
import {
    getEquipments,
    createEquipment,
    updateEquipment,
    deleteEquipment
} from "../controllers/management.js"
const router = express.Router();

router.get("/equipment", getEquipments);
router.post("/equipment", createEquipment);
router.put("/equipment/:id", updateEquipment)
router.delete("/equipment/:id", deleteEquipment)

export default router;