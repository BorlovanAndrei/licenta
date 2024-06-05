import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phoneNumber: String,
    address: String
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
