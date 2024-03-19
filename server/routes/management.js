import express from "express";
import {
    getEquipments,
    createEquipment,
    updateEquipment,
    deleteEquipment,
    getOperations,
    getOperationsForChart,
    createOperations
} from "../controllers/management.js"
const router = express.Router();

router.get("/equipment", getEquipments);
router.post("/equipment", createEquipment);
router.put("/equipment/:id", updateEquipment)
router.delete("/equipment/:id", deleteEquipment)

//operation
router.get("/operations", getOperations);
router.get("/operationsChart", getOperationsForChart);
router.post("/operations", createOperations);


export default router;