const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Company = require("../models/Company");

router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    await Company.findByIdAndUpdate(user.companyId, {
      $push: { users: user._id }
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:companyId", async (req, res) => {
  try {
    const users = await User.find({ companyId: req.params.companyId });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    await Company.findByIdAndUpdate(user.companyId, {
      $pull: { users: user._id }
    });
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;