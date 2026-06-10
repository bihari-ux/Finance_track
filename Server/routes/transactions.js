const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const { protect } = require('../middleware/auth');

// @route   GET /api/transactions
// @desc    Get all transactions
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @route   POST /api/transactions
// @desc    Add transaction
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { title, amount, type, category, paymentMethod, date, notes, receiptImage } = req.body;

    const transaction = await Transaction.create({
      title,
      amount,
      type,
      category,
      paymentMethod,
      date,
      notes,
      receiptImage,
      user: req.user.id
    });

    // Send transaction notification email
    try {
      const sendEmail = require('../utils/sendEmail');
      const actionText = type === 'income' ? 'added to' : (type === 'expense' ? 'spent from' : 'recorded in');
      sendEmail({
        email: req.user.email,
        subject: `Transaction Alert: ${title}`,
        message: `Hello ${req.user.name},\n\nA new transaction has been ${actionText} your Fintriq account.\n\nDetails:\n- Title: ${title}\n- Amount: ₹${amount}\n- Category: ${category}\n- Type: ${type}\n\nKeep track of your finances on the Fintriq dashboard.\n\nBest regards,\nThe Fintriq Team`,
      }).catch(err => console.log('Email notification failed:', err.message));
    } catch (err) {
      console.log('Failed to trigger email notification:', err.message);
    }

    return res.status(201).json({
      success: true,
      data: transaction
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
});

// @route   PUT /api/transactions/:id
// @desc    Update transaction
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ success: false, error: 'No transaction found' });
    }

    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: 'User not authorized' });
    }

    transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    return res.status(200).json({ success: true, data: transaction });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   DELETE /api/transactions/:id
// @desc    Delete transaction
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'No transaction found'
      });
    }

    // Make sure user owns transaction
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'User not authorized'
      });
    }

    await transaction.deleteOne();

    return res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

module.exports = router;
