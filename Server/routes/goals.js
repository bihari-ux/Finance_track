const express = require('express');
const router = express.Router();
const SavingsGoal = require('../models/SavingsGoal');
const { protect } = require('../middleware/auth');

// @route   GET /api/goals
// @desc    Get all savings goals
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const goals = await SavingsGoal.find({ user: req.user.id });
    res.status(200).json({ success: true, data: goals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/goals
// @desc    Create a savings goal
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { goalName, targetAmount, savedAmount, targetDate } = req.body;
    const goal = await SavingsGoal.create({
      goalName,
      targetAmount,
      savedAmount: savedAmount || 0,
      targetDate,
      user: req.user.id,
    });
    res.status(201).json({ success: true, data: goal });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/goals/:id
// @desc    Update a savings goal
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    let goal = await SavingsGoal.findById(req.params.id);
    if (!goal) return res.status(404).json({ success: false, message: 'Goal not found' });
    if (goal.user.toString() !== req.user.id) return res.status(401).json({ success: false, message: 'Not authorized' });

    goal = await SavingsGoal.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: goal });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/goals/:id
// @desc    Delete a savings goal
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const goal = await SavingsGoal.findById(req.params.id);
    if (!goal) return res.status(404).json({ success: false, message: 'Goal not found' });
    if (goal.user.toString() !== req.user.id) return res.status(401).json({ success: false, message: 'Not authorized' });

    await goal.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
