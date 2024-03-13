import mongoose from "mongoose";

const PlanStatSchema = new mongoose.Schema(
  {
    planId: String,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
  },
  { timestamps: true }
);

const PlanStat = mongoose.model("PlanStat", PlanStatSchema);
export default PlanStat;
