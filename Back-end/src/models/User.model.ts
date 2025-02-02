import mongoose, { model, Schema } from "mongoose";
import { IUser } from "../interface/User.interface.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profileImage: {
      type: String,
    },
  },
  { timestamps: true }
);

const userModel = model<IUser>('Users',userSchema);
export default userModel;