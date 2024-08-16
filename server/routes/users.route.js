const {
  register,
  login,
  profile,
  changeUserPassword,
  updateUserProfile,
  getAllUsers,
} = require("../controllers/users.controller");
const isAuthenticated = require("../middlewares/isAuth");
const express = require("express");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", isAuthenticated, profile);
router.put("/change-password", isAuthenticated, changeUserPassword);
router.put("/update-profile", isAuthenticated, updateUserProfile);
router.get("/", isAuthenticated, getAllUsers);

module.exports = router;
