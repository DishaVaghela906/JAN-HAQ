const mongoose = require('mongoose');

// Define User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    ageGroup: { type: String, default: "" },      // e.g., "18-25"
    role: { type: String, default: "" },          // e.g., "student", "citizen"
    interests: { type: [String], default: [] },    // e.g., ["law", "transport"]
    casteCategory: { type: String, default: "" }, // e.g., "General", "OBC", "SC", "ST", "Other"
    languagePreference: { type: String, default: "English" }, // e.g., "English", "हिन्दी", etc.
    address: { type: String, default: "" },        // User's address
    profilePic: { type: String, default: "" }      // base64 string or image URL
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export the model
module.exports = mongoose.model('User', userSchema);
