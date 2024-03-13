import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    category: String,
  },
  { timestamps: true }
);

const Plan = mongoose.model("Plan", PlanSchema);
export default Plan;
