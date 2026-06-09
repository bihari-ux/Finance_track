import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layouts/Sidebar';
import { getTransactions, addTransaction, updateTransaction, deleteTransaction } from '../../utils/api';
import { ArrowUpRight, Plus, Trash2, Tag, Edit2, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment';

const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Investments', 'Gifts', 'Business', 'Other'];

export default function Income() {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: '', amount: '', category: 'Salary' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    try {
      const res = await getTransactions();
      const incomeData = res.data.data.filter((t) => t.type === 'income');
      setIncomes(incomeData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching incomes:', error);
      toast.error('Failed to load income data');
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
          type: 'income',
        });
        setIncomes(incomes.map((i) => (i._id === editingId ? res.data.data : i)));
        toast.success('Income updated successfully!');
        setEditingId(null);
      } else {
        const res = await addTransaction({
          ...formData,
          amount: Number(formData.amount),
          type: 'income',
        });
        setIncomes([res.data.data, ...incomes]);
        toast.success('Income added successfully!');
      }
      setFormData({ title: '', amount: '', category: 'Salary' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to process income');
      console.error(error);
    }
  };

  const handleEdit = (income) => {
    setEditingId(income._id);
    setFormData({
      title: income.title,
      amount: income.amount,
      category: income.category || 'Salary'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ title: '', amount: '', category: 'Salary' });
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      setIncomes(incomes.filter((i) => i._id !== id));
      toast.success('Income deleted');
    } catch (error) {
      toast.error('Failed to delete income');
      console.error(error);
    }
  };

  return (
    <Sidebar>
      <Toaster position="top-right" />
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-emerald-100 rounded-xl shadow-sm border border-emerald-200">
            <ArrowUpRight className="w-8 h-8 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Income</h1>
            <p className="text-slate-500 mt-1">Track and manage your revenue streams.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm sticky top-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-800">
                  {editingId ? 'Edit Income' : 'Add New Income'}
                </h3>
                {editingId && (
                  <button onClick={handleCancelEdit} className="p-1 hover:bg-slate-100 rounded-full text-slate-500">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                  <input
                    type="text"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                    placeholder="e.g. June Salary"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Tag className="h-5 w-5 text-slate-400" />
                    </div>
                    <select
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all appearance-none"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      {INCOME_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Amount (₹)</label>
                  <input
                    type="number"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/20"
                >
                  {editingId ? (
                    <>
                      <Edit2 className="w-5 h-5" />
                      <span>Update Income</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      <span>Add Income</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Recent Incomes</h3>
              {loading ? (
                <div className="flex justify-center py-10">
                  <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : incomes.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200 border-dashed">
                  <ArrowUpRight className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 font-medium">No income records found.</p>
                  <p className="text-slate-400 text-sm mt-1">Add your first income using the form.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {incomes.map((income) => (
                    <div
                      key={income._id}
                      className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                          <ArrowUpRight className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-slate-800 font-bold text-lg">{income.title}</h4>
                          <div className="flex items-center space-x-2 text-sm text-slate-500">
                            <span className="font-medium px-2 py-0.5 bg-slate-100 rounded-md text-slate-600">{income.category || 'Other'}</span>
                            <span>•</span>
                            <span>{moment(income.createdAt).format('MMM Do, h:mm a')}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-emerald-600 font-black text-xl">+₹{income.amount.toLocaleString()}</span>
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEdit(income)}
                            className="p-2 text-blue-400 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                            title="Edit Income"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(income._id)}
                            className="p-2 text-rose-400 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-colors"
                            title="Delete Income"
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
