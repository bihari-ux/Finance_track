const mongoose = require('mongoose');

const SavingsGoalSchema = new mongoose.Schema({
  goalName: {
    type: String,
    trim: true,
    required: [true, 'Please add a goal name']
  },
  targetAmount: {
    type: Number,
    required: [true, 'Please add a target amount']
  },
  savedAmount: {
    type: Number,
    default: 0
  },
  targetDate: {
    type: Date,
    required: [true, 'Please add a target date']
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Virtual for progress
SavingsGoalSchema.virtual('progress').get(function() {
  if (this.targetAmount === 0) return 0;
  return (this.savedAmount / this.targetAmount) * 100;
});

// Ensure virtuals are included in JSON
SavingsGoalSchema.set('toJSON', { virtuals: true });
SavingsGoalSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('SavingsGoal', SavingsGoalSchema);
