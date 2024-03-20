import mongoose from "mongoose";

const TrainerSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    email: String,
    phoneNumber: String,
    address: String
  },
  { timestamps: true }
);

const Trainer = mongoose.model("Trainer", TrainerSchema);
export default Trainer;
