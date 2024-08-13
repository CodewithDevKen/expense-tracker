const asyncHandler = require("express-async-handler");
const User = require("../model/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//! User Registration
const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  //! Validate
  if (!username || !email || !password) {
    throw new Error("All fields are required");
  }

  //! Check for duplicate
  const userExists = await User.findOne({ username });
  if (userExists) {
    throw new Error("User already exists");
  }

  //! Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //! Create the user and save into database
  const userCreated = await User.create({
    email,
    username,
    password: hashedPassword,
  });

  res.json({
    message: "New user has been created!",
    username: userCreated.username,
    email: userCreated.email,
    id: userCreated._id,
  });
});

//! User Login
const login = asyncHandler(async (req, res) => {
  //! Get the user data
  const { username, password } = req.body;

  //! Check if username is valid
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error("Invalid login credentials");
  }

  //! Compare the user password to hashedPassword
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new error("Invalid login credentials");
  }

  //! Generate a token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });

  //! Send the response
  res.json({
    message: "Login Success",
    token,
    id: user._id,
    username: user.username,
    email: user.email,
  });
});

//! User Profile
const profile = asyncHandler(async (req, res) => {
  //! Find the user
  const user = await User.findById(req.user);
  if (!user) {
    throw new Error("User not found");
  }

  //! Send the response
  res.json({ username: user.username, email: user.email });
});

//! Change user password
const changeUserPassword = asyncHandler(async (req, res) => {
  const { newPassword } = req.body;

  //! Find the user
  const user = await User.findById(req.user);
  if (!user) {
    throw new Error("User not found");
  }

  //! Hash the new password before saving
  //! Hash the user password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashedPassword;

  //! Resave
  await user.save();

  //! Send the response
  res.json({
    message: "Password changed successfully",
  });
});

//! Update User Profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const { email, username } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    req.user,
    {
      username,
      email,
    },
    {
      new: true,
    }
  );
  res.json({ message: "User profile updated successfully", updatedUser });
});

module.exports = {
  register,
  profile,
  login,
  changeUserPassword,
  updateUserProfile,
};
