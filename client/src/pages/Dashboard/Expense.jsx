import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layouts/Sidebar';
import { getTransactions, addTransaction, updateTransaction, deleteTransaction } from '../../utils/api';
import { ArrowDownRight, Plus, Trash2, Tag, Edit2, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment';

const EXPENSE_CATEGORIES = ['Housing', 'Food', 'Transportation', 'Utilities', 'Entertainment', 'Healthcare', 'Shopping', 'Rent', 'Fare', 'Subscription', 'Other'];

export default function Expense() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: '', amount: '', category: 'Food' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await getTransactions();
      const expenseData = res.data.data.filter((t) => t.type === 'expense');
      setExpenses(expenseData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      toast.error('Failed to load expense data');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      if (editingId) {
        const res = await updateTransaction(editingId, {
          ...formData,
          amount: Number(formData.amount),
          type: 'expense',
        });
        setExpenses(expenses.map((exp) => (exp._id === editingId ? res.data.data : exp)));
        toast.success('Expense updated successfully!');
        setEditingId(null);
      } else {
        const res = await addTransaction({
          ...formData,
          amount: Number(formData.amount),
          type: 'expense',
        });
        setExpenses([res.data.data, ...expenses]);
        toast.success('Expense added successfully!');
      }
      setFormData({ title: '', amount: '', category: 'Food' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to process expense');
      console.error(error);
    }
  };

  const handleEdit = (expense) => {
    setEditingId(expense._id);
    setFormData({
      title: expense.title,
      amount: expense.amount,
      category: expense.category || 'Food'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ title: '', amount: '', category: 'Food' });
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      setExpenses(expenses.filter((e) => e._id !== id));
      toast.success('Expense deleted');
    } catch (error) {
      toast.error('Failed to delete expense');
      console.error(error);
    }
  };

  return (
    <Sidebar>
      <Toaster position="top-right" />
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 rounded-xl shadow-sm border" style={{ background: '#FFE1ED', borderColor: 'rgba(255,111,175,0.2)' }}>
            <ArrowDownRight className="w-8 h-8" style={{ color: '#FF6FAF' }} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: '#0E1A22' }}>Expenses</h1>
            <p className="mt-1" style={{ color: '#4A5560' }}>Track where your money is going.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white border rounded-2xl p-6 shadow-sm sticky top-8" style={{ borderColor: '#E5ECF0' }}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold" style={{ color: '#0E1A22' }}>
                  {editingId ? 'Edit Expense' : 'Add New Expense'}
                </h3>
                {editingId && (
                  <button onClick={handleCancelEdit} className="p-1 rounded-full transition-colors" style={{ color: '#4A5560' }} onMouseEnter={e => e.currentTarget.style.background = '#F6F8FA'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#283139' }}>Description</label>
                  <input
                    type="text"
                    className="w-full border rounded-xl px-4 py-3 focus:outline-none transition-all"
                    style={{ background: '#F6F8FA', borderColor: '#E5ECF0', color: '#0E1A22' }}
                    onFocus={e => { e.currentTarget.style.borderColor = '#FF6FAF'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(255,111,175,0.2)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = '#E5ECF0'; e.currentTarget.style.boxShadow = 'none'; }}
                    placeholder="e.g. Groceries, Netflix"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#283139' }}>Category</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Tag className="h-5 w-5" style={{ color: '#8FA3B0' }} />
                    </div>
                    <select
                      className="w-full border rounded-xl pl-10 pr-4 py-3 focus:outline-none transition-all appearance-none"
                      style={{ background: '#F6F8FA', borderColor: '#E5ECF0', color: '#0E1A22' }}
                      onFocus={e => { e.currentTarget.style.borderColor = '#FF6FAF'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(255,111,175,0.2)'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = '#E5ECF0'; e.currentTarget.style.boxShadow = 'none'; }}
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      {EXPENSE_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#283139' }}>Amount (₹)</label>
                  <input
                    type="number"
                    className="w-full border rounded-xl px-4 py-3 focus:outline-none transition-all"
                    style={{ background: '#F6F8FA', borderColor: '#E5ECF0', color: '#0E1A22' }}
                    onFocus={e => { e.currentTarget.style.borderColor = '#FF6FAF'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(255,111,175,0.2)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = '#E5ECF0'; e.currentTarget.style.boxShadow = 'none'; }}
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center space-x-2"
                  style={{ background: '#FF6FAF', boxShadow: '0 4px 14px rgba(255,111,175,0.3)' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#e6599b'}
                  onMouseLeave={e => e.currentTarget.style.background = '#FF6FAF'}
                >
                  {editingId ? (
                    <>
                      <Edit2 className="w-5 h-5" />
                      <span>Update Expense</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      <span>Add Expense</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white border rounded-2xl p-6 shadow-sm" style={{ borderColor: '#E5ECF0' }}>
              <h3 className="text-xl font-bold mb-6" style={{ color: '#0E1A22' }}>Recent Expenses</h3>
              {loading ? (
                <div className="flex justify-center py-10">
                  <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#FF6FAF', borderTopColor: 'transparent' }}></div>
                </div>
              ) : expenses.length === 0 ? (
                <div className="text-center py-12 rounded-xl border border-dashed" style={{ background: '#F6F8FA', borderColor: '#E5ECF0' }}>
                  <ArrowDownRight className="w-12 h-12 mx-auto mb-3" style={{ color: '#8FA3B0' }} />
                  <p className="font-medium" style={{ color: '#4A5560' }}>No expense records found.</p>
                  <p className="text-sm mt-1" style={{ color: '#8FA3B0' }}>Add your first expense using the form.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {expenses.map((expense) => (
                    <div
                      key={expense._id}
                      className="flex items-center justify-between p-4 bg-white rounded-xl border shadow-sm transition-all group"
                      style={{ borderColor: '#E5ECF0' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#F8FBFA'}
                      onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-3 rounded-xl" style={{ background: '#FFE1ED', color: '#FF6FAF' }}>
                          <ArrowDownRight className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg" style={{ color: '#0E1A22' }}>{expense.title}</h4>
                          <div className="flex items-center space-x-2 text-sm mt-0.5" style={{ color: '#8FA3B0' }}>
                            <span className="font-medium px-2 py-0.5 rounded-md" style={{ background: '#F6F8FA', color: '#4A5560' }}>{expense.category || 'Other'}</span>
                            <span>•</span>
                            <span>{moment(expense.createdAt).format('MMM Do, h:mm a')}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-black text-xl" style={{ color: '#0E1A22' }}>-₹{expense.amount.toLocaleString()}</span>
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEdit(expense)}
                            className="p-2 rounded-lg transition-colors"
                            style={{ color: '#40C3F9' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#e0f2fe'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            title="Edit Expense"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(expense._id)}
                            className="p-2 rounded-lg transition-colors"
                            style={{ color: '#FF6FAF' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#fce7f3'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            title="Delete Expense"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
