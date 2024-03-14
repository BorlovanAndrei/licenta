import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: {
        type: String,
        required: true,
        min: 5,
      },
    phoneNumber: String,
    address: String,
    transactions: Array,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
