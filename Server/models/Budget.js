const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  budgetAmount: {
    type: Number,
    required: [true, 'Please add a budget amount']
  },
  spentAmount: {
    type: Number,
    default: 0
  },
  month: {
    type: String, // Format: YYYY-MM
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Budget', BudgetSchema);
