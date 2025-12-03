import mongoose from "mongoose";

// define schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'User name is required.'],
      trim: true,
      minLength: 2,
      maxLength: 150
    },
    email: {
      type: String,
      required: [true, 'Email address is required.'],
      trim: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address."]
    },
    password: {
      type: String,
      minLength: 2
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true
    },
    profileImage: {
      type: String,
    },
  },
  { timestamps: true }
);

// create a model
const User = mongoose.model("User", userSchema);

export default User;