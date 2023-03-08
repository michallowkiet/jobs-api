import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import IUser, { IUserMethods, UserModel } from "../types/IUser.js";

const UserSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
  name: {
    type: String,
    trim: true,
    required: [true, "Please provide name"],
    min: 3,
    max: 50,
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    min: 6,
  },
  lastName: {
    type: String,
    trim: true,
    max: 30,
  },
  location: {
    type: String,
    trim: true,
    max: 30,
  },
});

UserSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

UserSchema.methods.checkPassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const User = mongoose.model("User", UserSchema);

export default User;
