import mongoose from "mongoose";

const OperationSchema = new mongoose.Schema(
  {
    cost: String,
    equipmentId: String,
    units: Number
  },
  { timestamps: true }
);

const Operation = mongoose.model("Operation", OperationSchema);
export default Operation;