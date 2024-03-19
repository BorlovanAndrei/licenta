import mongoose from "mongoose";

const EquipmentSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    category: String,
  },
  { timestamps: true }
);

const Equipment = mongoose.model("Equipment", EquipmentSchema);
export default Equipment;
