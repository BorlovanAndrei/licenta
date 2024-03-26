import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema({
  title: String,
  description: String,
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  trainerId: String
});

const Classes = mongoose.model('Class', ClassSchema);
export default Classes;
