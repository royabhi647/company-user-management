const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactNumber: { type: String },
  profilePic: { type: String },
  bio: { type: String },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("Company", companySchema);