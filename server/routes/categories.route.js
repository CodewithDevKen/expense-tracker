const express = require("express");
const {
  lists,
  create,
  update,
  remove,
} = require("../controllers/categories.controller");
const isAuthenticated = require("../middlewares/isAuth");

const router = express.Router();

//! Add
router.post("/create", isAuthenticated, create);

//! Lists
router.get("/lists", isAuthenticated, lists);

//! Update
router.put("/update/:id", isAuthenticated, update);

//! Delete
router.delete("/delete/:id", isAuthenticated, remove);

module.exports = router;
