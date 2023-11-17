const Expense = require('../models/Expense');
const mongoose = require('mongoose');

const isDevEnv = process.env.IS_DEV_ENV;

const findByQuery = async (query) => {
  const expenses = await Expense.find(query);
  return expenses;
};

const findAllExpenses = async () => {
  const expenses = await Expense.find();
  return expenses;
};

const findExpensesByDate = async (fromDate, toDate) => {
  const query = {
    date: { $gte: new Date(fromDate), $lte: new Date(toDate) },
  };
  const expenses = await Expense.find(query);
  if (isDevEnv) {
    console.log(expenses);
  }

  return expenses;
};

const createExpense = async (expenseToBeSaved) => {
  const savedExpense = await expenseToBeSaved.save();
  return savedExpense;
};

const updateExpense = async (id, expenseToBeSaved) => {
  const actualId = new mongoose.Types.ObjectId(id);

  const updatedExpense = await Expense.findByIdAndUpdate(
    actualId,
    {
      $set: {
        description: expenseToBeSaved.description,
        date: expenseToBeSaved.date,
        paidBy: expenseToBeSaved.paidBy,
        reason: expenseToBeSaved.reason,
        amount: expenseToBeSaved.amount,
      },
    },
    { new: true }
  );

  return updatedExpense;
};

const findById = async (id) => {
  const actualId = new mongoose.Types.ObjectId(id);
  const savedExpense = await Expense.findById(actualId);
  return savedExpense;
};

const deleteExpense = async (id) => {
  const actualId = new mongoose.Types.ObjectId(id);

  await Expense.findByIdAndDelete(actualId);
};
module.exports = {
  findByQuery,
  findAllExpenses,
  findExpensesByDate,
  createExpense,
  findById,
  updateExpense,
  deleteExpense,
};
