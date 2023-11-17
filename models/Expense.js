const mongoose = require('mongoose');
mongoose.set('debug', true);

const ExpenseSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      index: true,
      required: true,
      auto: true,
    },
    amount: {
      type: Number,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
    },
    expenseId: {
      type: String,
    },
    paidBy: {
      type: String,
    },
    reason: {
      type: String,
    },
  },
  { collection: 'monthlyexpense' }
);

module.exports = mongoose.model('Expense', ExpenseSchema);
