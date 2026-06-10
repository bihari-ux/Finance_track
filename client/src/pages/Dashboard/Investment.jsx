import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layouts/Sidebar';
import { getTransactions, addTransaction, updateTransaction, deleteTransaction } from '../../utils/api';
import { TrendingUp, Plus, Trash2, Tag, Edit2, X, Briefcase } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment';

const INVESTMENT_CATEGORIES = ['Stocks', 'Mutual Funds', 'Crypto', 'Fixed Deposit', 'Real Estate', 'Bonds', 'Other'];

export default function Investment() {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: '', amount: '', category: 'Stocks' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    try {
      const res = await getTransactions();
      const data = res.data.data.filter((t) => t.type === 'investment');
      setInvestments(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching investments:', error);
      toast.error('Failed to load investment data');
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
          type: 'investment',
        });
        setInvestments(investments.map((i) => (i._id === editingId ? res.data.data : i)));
        toast.success('Investment updated successfully!');
        setEditingId(null);
      } else {
        const res = await addTransaction({
          ...formData,
          amount: Number(formData.amount),
          type: 'investment',
        });
        setInvestments([res.data.data, ...investments]);
        toast.success('Investment added successfully!');
      }
      setFormData({ title: '', amount: '', category: 'Stocks' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to process investment');
    }
  };

  const handleEdit = (inv) => {
    setEditingId(inv._id);
    setFormData({
      title: inv.title,
      amount: inv.amount,
      category: inv.category || 'Stocks'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ title: '', amount: '', category: 'Stocks' });
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      setInvestments(investments.filter((i) => i._id !== id));
      toast.success('Investment deleted');
    } catch (error) {
      toast.error('Failed to delete investment');
    }
  };

  return (
    <Sidebar>
      <Toaster position="top-right" />
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 rounded-xl shadow-sm border" style={{ background: '#E0F7FA', borderColor: 'rgba(0,188,212,0.2)' }}>
            <TrendingUp className="w-8 h-8" style={{ color: '#00BCD4' }} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: '#0E1A22' }}>Investments</h1>
            <p className="mt-1" style={{ color: '#4A5560' }}>Track and manage your portfolio growth.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white border rounded-2xl p-6 shadow-sm sticky top-8" style={{ borderColor: '#E5ECF0' }}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold" style={{ color: '#0E1A22' }}>
                  {editingId ? 'Edit Investment' : 'Add Investment'}
                </h3>
                {editingId && (
                  <button onClick={handleCancelEdit} className="p-1 rounded-full transition-colors" style={{ color: '#4A5560' }} onMouseEnter={e => e.currentTarget.style.background = '#F6F8FA'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#283139' }}>Asset Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Briefcase className="h-5 w-5" style={{ color: '#8FA3B0' }} />
                    </div>
                    <input
                      type="text"
                      className="w-full border rounded-xl pl-10 pr-4 py-3 focus:outline-none transition-all"
                      style={{ background: '#F6F8FA', borderColor: '#E5ECF0', color: '#0E1A22' }}
                      onFocus={e => { e.currentTarget.style.borderColor = '#00BCD4'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(0,188,212,0.2)'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = '#E5ECF0'; e.currentTarget.style.boxShadow = 'none'; }}
                      placeholder="e.g. Apple Stock, Bitcoin"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#283139' }}>Asset Class</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Tag className="h-5 w-5" style={{ color: '#8FA3B0' }} />
                    </div>
                    <select
                      className="w-full border rounded-xl pl-10 pr-4 py-3 focus:outline-none transition-all appearance-none"
                      style={{ background: '#F6F8FA', borderColor: '#E5ECF0', color: '#0E1A22' }}
                      onFocus={e => { e.currentTarget.style.borderColor = '#00BCD4'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(0,188,212,0.2)'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = '#E5ECF0'; e.currentTarget.style.boxShadow = 'none'; }}
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      {INVESTMENT_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#283139' }}>Invested Amount (₹)</label>
                  <input
                    type="number"
                    className="w-full border rounded-xl px-4 py-3 focus:outline-none transition-all"
                    style={{ background: '#F6F8FA', borderColor: '#E5ECF0', color: '#0E1A22' }}
                    onFocus={e => { e.currentTarget.style.borderColor = '#00BCD4'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(0,188,212,0.2)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = '#E5ECF0'; e.currentTarget.style.boxShadow = 'none'; }}
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center space-x-2"
                  style={{ background: '#00BCD4', boxShadow: '0 4px 14px rgba(0,188,212,0.3)' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#0097a7'}
                  onMouseLeave={e => e.currentTarget.style.background = '#00BCD4'}
                >
                  {editingId ? (
                    <>
                      <Edit2 className="w-5 h-5" />
                      <span>Update Asset</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      <span>Add Asset</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white border rounded-2xl p-6 shadow-sm" style={{ borderColor: '#E5ECF0' }}>
              <h3 className="text-xl font-bold mb-6" style={{ color: '#0E1A22' }}>Current Portfolio</h3>
              {loading ? (
                <div className="flex justify-center py-10">
                  <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#00BCD4', borderTopColor: 'transparent' }}></div>
                </div>
              ) : investments.length === 0 ? (
                <div className="text-center py-12 rounded-xl border border-dashed" style={{ background: '#F6F8FA', borderColor: '#E5ECF0' }}>
                  <TrendingUp className="w-12 h-12 mx-auto mb-3" style={{ color: '#8FA3B0' }} />
                  <p className="font-medium" style={{ color: '#4A5560' }}>No investments found.</p>
                  <p className="text-sm mt-1" style={{ color: '#8FA3B0' }}>Add your first asset to start building wealth.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {investments.map((inv) => (
                    <div
                      key={inv._id}
                      className="flex items-center justify-between p-4 bg-white rounded-xl border shadow-sm transition-all group"
                      style={{ borderColor: '#E5ECF0' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#F8FBFA'}
                      onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-3 rounded-xl" style={{ background: '#E0F7FA', color: '#00BCD4' }}>
                          <TrendingUp className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg" style={{ color: '#0E1A22' }}>{inv.title}</h4>
                          <div className="flex items-center space-x-2 text-sm mt-0.5" style={{ color: '#8FA3B0' }}>
                            <span className="font-medium px-2 py-0.5 rounded-md" style={{ background: '#F6F8FA', color: '#4A5560' }}>{inv.category || 'Other'}</span>
                            <span>•</span>
                            <span>{moment(inv.createdAt).format('MMM Do, h:mm a')}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-black text-xl" style={{ color: '#00BCD4' }}>₹{inv.amount.toLocaleString()}</span>
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEdit(inv)}
                            className="p-2 rounded-lg transition-colors"
                            style={{ color: '#40C3F9' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#e0f2fe'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            title="Edit"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(inv._id)}
                            className="p-2 rounded-lg transition-colors"
                            style={{ color: '#FF6FAF' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#fce7f3'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            title="Delete"
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
