const asyncHandler = require("express-async-handler");
const Transaction = require("../model/Transaction.js");

// !Add
const create = asyncHandler(async (req, res) => {
  const { type, category, amount, date, description } = req.body;
  if (!amount || !type || !date) {
    throw new Error("Type, amount and date are required");
  }

  //! Create
  const transaction = await Transaction.create({
    user: req.user,
    type,
    category,
    amount,
    description,
  });
  res.status(201).json(transaction);
});

//! Lists
const getFilteredTransactions = asyncHandler(async (req, res) => {
  const { startDate, endDate, type, category } = req.query;
  let filters = { user: req.user };
  if (startDate) {
    filters.date = { ...filters.date, $gte: new Date(startDate) };
  }
  if (endDate) {
    filters.date = { ...filters.date, $gte: new Date(endDate) };
  }
  if (type) {
    filters.type = type;
  }
  if (category) {
    if (category === "All") {
      //! No categroy filter needed when filtering for "All"
    } else if (category === "Uncategorized") {
      //! Filter for transactions that are specifically categorized as "Uncategorized"
    } else {
      filters.category = category;
    }
  }
  const transactions = await Transaction.find(filters).sort({ date: -1 });
  res.json(transactions);
});

//! Update
const update = asyncHandler(async (req, res) => {
  //! Find the transaction
  const transaction = await Transaction.findById(req.params.id);
  if (transaction && transaction.user.toString() === req.user.toString()) {
    (transaction.type = req.body.type || transaction.type),
      (transaction.category = req.body.category || transaction.category),
      (transaction.amount = req.body.amount || transaction.amount),
      (transaction.date = req.body.date || transaction.date),
      (transaction.description =
        req.body.description || transaction.description);

    const updatedTransaction = await transaction.save();
    res.json(updatedTransaction);
  }
});

const remove = asyncHandler(async (req, res) => {
  //! Find the transaction
  const transaction = await Transaction.findById(req.params.id);
  if (transaction && transaction.user.toString() === req.user.toString()) {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Transaction removed" });
  }
});

module.exports = { create, update, remove, getFilteredTransactions };
