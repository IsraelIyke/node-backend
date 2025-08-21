const User = require("../models/User");

// Get all users
const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// Create a new user
const createUser = async (req, res) => {
  const user = new User({ name: req.body.name });
  const savedUser = await user.save();
  res.status(201).json(savedUser);
};

// Update a user
const updateUser = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!updatedUser) return res.status(404).json({ message: "User not found" });
  res.json(updatedUser);
};

// Delete a user
const deleteUser = async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User deleted" });
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
