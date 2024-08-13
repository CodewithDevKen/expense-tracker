const express = require("express");
const {
  create,
  getFilteredTransactions,
  update,
  remove,
} = require("../controllers/transactions.controller");
const isAuthenticated = require("../middlewares/isAuth");

const router = express.Router();

//! Add
router.post("/create", isAuthenticated, create);

//! Lists
router.get("/lists", isAuthenticated, getFilteredTransactions);

//! Update
router.put("/update/:id", isAuthenticated, update);

//! Delete
router.delete("/delete/:id", isAuthenticated, remove);

module.exports = router;
