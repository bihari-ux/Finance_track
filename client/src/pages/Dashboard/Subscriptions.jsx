import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layouts/Sidebar';
import { getTransactions, addTransaction, deleteTransaction } from '../../utils/api';
import { CreditCard, Plus, Trash2, Calendar } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment';

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: '', amount: '' });

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const res = await getTransactions();
      // Filter expenses that are categorized as Subscription
      const data = res.data.data.filter((t) => t.type === 'expense' && t.category === 'Subscription');
      setSubscriptions(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      toast.error('Failed to load subscriptions');
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
      const res = await addTransaction({
        ...formData,
        amount: Number(formData.amount),
        type: 'expense',
        category: 'Subscription'
      });
      setSubscriptions([res.data.data, ...subscriptions]);
      toast.success('Subscription added successfully!');
      setFormData({ title: '', amount: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to process subscription');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      setSubscriptions(subscriptions.filter((i) => i._id !== id));
      toast.success('Subscription deleted');
    } catch (error) {
      toast.error('Failed to delete subscription');
    }
  };

  const totalMonthlyCost = subscriptions.reduce((acc, curr) => acc + curr.amount, 0);
  const totalYearlyCost = totalMonthlyCost * 12;

  return (
    <Sidebar>
      <Toaster position="top-right" />
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 rounded-xl shadow-sm border" style={{ background: '#ede9fe', borderColor: 'rgba(139,92,246,0.2)' }}>
            <CreditCard className="w-8 h-8" style={{ color: '#8b5cf6' }} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: '#0E1A22' }}>Subscriptions</h1>
            <p className="mt-1" style={{ color: '#4A5560' }}>Manage your recurring payments and bills.</p>
          </div>
        </div>

        {/* Analytics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border p-6 rounded-2xl shadow-sm" style={{ borderColor: '#E5ECF0' }}>
            <p className="font-medium mb-1" style={{ color: '#4A5560' }}>Monthly Cost</p>
            <h2 className="text-3xl font-black" style={{ color: '#0E1A22' }}>₹{totalMonthlyCost.toLocaleString()}</h2>
          </div>
          <div className="border p-6 rounded-2xl shadow-sm" style={{ background: '#8b5cf6', borderColor: '#7c3aed', color: '#fff' }}>
            <p className="font-medium mb-1" style={{ color: 'rgba(255,255,255,0.85)' }}>Yearly Cost (Projection)</p>
            <h2 className="text-3xl font-black text-white">₹{totalYearlyCost.toLocaleString()}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white border rounded-2xl p-6 shadow-sm sticky top-8" style={{ borderColor: '#E5ECF0' }}>
              <h3 className="text-xl font-bold mb-6" style={{ color: '#0E1A22' }}>Add Subscription</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#283139' }}>Service Name</label>
                  <input
                    type="text"
                    className="w-full border rounded-xl px-4 py-3 focus:outline-none transition-all"
                    style={{ background: '#F6F8FA', borderColor: '#E5ECF0', color: '#0E1A22' }}
                    onFocus={e => { e.currentTarget.style.borderColor = '#8b5cf6'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(139,92,246,0.2)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = '#E5ECF0'; e.currentTarget.style.boxShadow = 'none'; }}
                    placeholder="Netflix, Spotify, Gym..."
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#283139' }}>Monthly Cost (₹)</label>
                  <input
                    type="number"
                    className="w-full border rounded-xl px-4 py-3 focus:outline-none transition-all"
                    style={{ background: '#F6F8FA', borderColor: '#E5ECF0', color: '#0E1A22' }}
                    onFocus={e => { e.currentTarget.style.borderColor = '#8b5cf6'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(139,92,246,0.2)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = '#E5ECF0'; e.currentTarget.style.boxShadow = 'none'; }}
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center space-x-2"
                  style={{ background: '#8b5cf6', boxShadow: '0 4px 14px rgba(139,92,246,0.3)' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#7c3aed'}
                  onMouseLeave={e => e.currentTarget.style.background = '#8b5cf6'}
                >
                  <Plus className="w-5 h-5" />
                  <span>Save Subscription</span>
                </button>
              </form>
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white border rounded-2xl p-6 shadow-sm" style={{ borderColor: '#E5ECF0' }}>
              <h3 className="text-xl font-bold mb-6" style={{ color: '#0E1A22' }}>Active Services</h3>
              {loading ? (
                <div className="flex justify-center py-10">
                  <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#8b5cf6', borderTopColor: 'transparent' }}></div>
                </div>
              ) : subscriptions.length === 0 ? (
                <div className="text-center py-12 rounded-xl border border-dashed" style={{ background: '#F6F8FA', borderColor: '#E5ECF0' }}>
                  <CreditCard className="w-12 h-12 mx-auto mb-3" style={{ color: '#8FA3B0' }} />
                  <p className="font-medium" style={{ color: '#4A5560' }}>No active subscriptions.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subscriptions.map((sub) => (
                    <div
                      key={sub._id}
                      className="p-5 bg-white rounded-2xl border shadow-sm transition-all group relative"
                      style={{ borderColor: '#E5ECF0' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#c4b5fd'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5ECF0'; e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)'; }}
                    >
                      <button
                        onClick={() => handleDelete(sub._id)}
                        className="absolute top-4 right-4 p-2 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        style={{ background: '#FFE1ED', color: '#FF6FAF' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#FF6FAF'; e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#FFE1ED'; e.currentTarget.style.color = '#FF6FAF'; }}
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ background: '#F6F8FA', color: '#4A5560' }}>
                            {sub.title.charAt(0).toUpperCase()}
                          </div>
                          <h4 className="font-bold text-lg leading-tight" style={{ color: '#0E1A22' }}>{sub.title}</h4>
                          <div className="flex items-center text-sm mt-2" style={{ color: '#8FA3B0' }}>
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>Billed Monthly</span>
                          </div>
                        </div>
                        <div className="mt-6">
                          <span className="font-black text-2xl" style={{ color: '#8b5cf6' }}>₹{sub.amount.toLocaleString()}</span>
                          <span className="text-sm" style={{ color: '#4A5560' }}>/mo</span>
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
