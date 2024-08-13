require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/users.route");
const categoryRouter = require("./routes/categories.route");
const transactionRouter = require("./routes/transactions.route");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

//! Middlewares
app.use(express.json()); //? PASS INCOMING DATA

//! Route
app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/transactions", transactionRouter);

//! Error
app.use(errorHandler);

//! Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port... ${PORT}`);
});

//!Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to Database"))
  .catch((e) => console.log(e));
