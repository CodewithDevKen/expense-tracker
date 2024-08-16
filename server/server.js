require("dotenv").config();
const cors = require("cors");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const rootRoutes = require("./routes/root.route");
const userRouter = require("./routes/users.route");
const categoryRouter = require("./routes/categories.route");
const transactionRouter = require("./routes/transactions.route");
const errorHandler = require("./middlewares/errorHandler");
const corsOptions = require("./config/corsOptions");

const app = express();

//! Middlewares
app.use(express.json()); //? PASS INCOMING DATA
app.use(cors(corsOptions));

//! Static Files
app.use("/", express.static(path.join(__dirname, "public")));

//! Route
app.use("/", rootRoutes);
app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/transactions", transactionRouter);

//! Error display

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

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
