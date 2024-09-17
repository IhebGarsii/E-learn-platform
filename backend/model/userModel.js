const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userModel = new Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure emails are unique
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Ensure passwords are of a minimum length
  },
  role: {
    type: String,
    enum: ["admin", "instructor", "student"], // Enum ensures the role is one of the specified values
    default: "student", // Default role is 'student'
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },

  image: {
    type: String,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "coursesModel", // Reference to a Course model
    },
  ],
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projectModel", // Reference to a Course model
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  avgRate: {
    rate: { type: Number, default: 0 },
    nbRate: { type: Number, default: 0 },
  },
  following: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  followers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  aboutMe: {
    type: String,
  },
  experience: { type: String, trim: true }, // Professional experience summary
  education: { type: String, trim: true }, // Educational background
  languages: [{ type: String, trim: true }], // Languages the instructor speaks or teaches
  skills: [{ type: String, trim: true }], // e.g., ["JavaScript", "React", "Node.js"]
  degree: { type: String },
  certifications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "certificationModel",
    },
  ],
});

module.exports = mongoose.model("userModel", userModel);
