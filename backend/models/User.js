const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String },
  profilePic: { type: String },
  bio: { type: String },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" }
});

module.exports = mongoose.model("User", userSchema);