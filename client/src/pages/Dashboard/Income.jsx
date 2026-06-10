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
          <div className="p-3 rounded-xl shadow-sm border" style={{ background: '#E1F2D8', borderColor: 'rgba(18,196,139,0.2)' }}>
            <ArrowUpRight className="w-8 h-8" style={{ color: '#12C48B' }} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: '#0E1A22' }}>Income</h1>
            <p className="mt-1" style={{ color: '#4A5560' }}>Track and manage your revenue streams.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white border rounded-2xl p-6 shadow-sm sticky top-8" style={{ borderColor: '#E5ECF0' }}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold" style={{ color: '#0E1A22' }}>
                  {editingId ? 'Edit Income' : 'Add New Income'}
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
                    onFocus={e => { e.currentTarget.style.borderColor = '#12C48B'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(18,196,139,0.2)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = '#E5ECF0'; e.currentTarget.style.boxShadow = 'none'; }}
                    placeholder="e.g. June Salary"
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
                      onFocus={e => { e.currentTarget.style.borderColor = '#12C48B'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(18,196,139,0.2)'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = '#E5ECF0'; e.currentTarget.style.boxShadow = 'none'; }}
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
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#283139' }}>Amount (₹)</label>
                  <input
                    type="number"
                    className="w-full border rounded-xl px-4 py-3 focus:outline-none transition-all"
                    style={{ background: '#F6F8FA', borderColor: '#E5ECF0', color: '#0E1A22' }}
                    onFocus={e => { e.currentTarget.style.borderColor = '#12C48B'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(18,196,139,0.2)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = '#E5ECF0'; e.currentTarget.style.boxShadow = 'none'; }}
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center space-x-2"
                  style={{ background: '#12C48B', boxShadow: '0 4px 14px rgba(18,196,139,0.3)' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#0fa876'}
                  onMouseLeave={e => e.currentTarget.style.background = '#12C48B'}
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
            <div className="bg-white border rounded-2xl p-6 shadow-sm" style={{ borderColor: '#E5ECF0' }}>
              <h3 className="text-xl font-bold mb-6" style={{ color: '#0E1A22' }}>Recent Incomes</h3>
              {loading ? (
                <div className="flex justify-center py-10">
                  <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#12C48B', borderTopColor: 'transparent' }}></div>
                </div>
              ) : incomes.length === 0 ? (
                <div className="text-center py-12 rounded-xl border border-dashed" style={{ background: '#F6F8FA', borderColor: '#E5ECF0' }}>
                  <ArrowUpRight className="w-12 h-12 mx-auto mb-3" style={{ color: '#8FA3B0' }} />
                  <p className="font-medium" style={{ color: '#4A5560' }}>No income records found.</p>
                  <p className="text-sm mt-1" style={{ color: '#8FA3B0' }}>Add your first income using the form.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {incomes.map((income) => (
                    <div
                      key={income._id}
                      className="flex items-center justify-between p-4 bg-white rounded-xl border shadow-sm transition-all group"
                      style={{ borderColor: '#E5ECF0' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#F8FBFA'}
                      onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-3 rounded-xl" style={{ background: '#E1F2D8', color: '#12C48B' }}>
                          <ArrowUpRight className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg" style={{ color: '#0E1A22' }}>{income.title}</h4>
                          <div className="flex items-center space-x-2 text-sm mt-0.5" style={{ color: '#8FA3B0' }}>
                            <span className="font-medium px-2 py-0.5 rounded-md" style={{ background: '#F6F8FA', color: '#4A5560' }}>{income.category || 'Other'}</span>
                            <span>•</span>
                            <span>{moment(income.createdAt).format('MMM Do, h:mm a')}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-black text-xl" style={{ color: '#12C48B' }}>+₹{income.amount.toLocaleString()}</span>
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEdit(income)}
                            className="p-2 rounded-lg transition-colors"
                            style={{ color: '#40C3F9' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#e0f2fe'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            title="Edit Income"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(income._id)}
                            className="p-2 rounded-lg transition-colors"
                            style={{ color: '#FF6FAF' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#fce7f3'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
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
