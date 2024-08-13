const {
  register,
  login,
  profile,
  changeUserPassword,
  updateUserProfile,
} = require("../controllers/users.controller");
const isAuthenticated = require("../middlewares/isAuth");
const express = require("express");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", isAuthenticated, profile);
router.put("/change-password", isAuthenticated, changeUserPassword);
router.put("/update-profile", isAuthenticated, updateUserProfile);

module.exports = router;
