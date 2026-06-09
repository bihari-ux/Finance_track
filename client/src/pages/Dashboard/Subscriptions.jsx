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
          <div className="p-3 bg-violet-100 rounded-xl shadow-sm border border-violet-200">
            <CreditCard className="w-8 h-8 text-violet-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Subscriptions</h1>
            <p className="text-slate-500 mt-1">Manage your recurring payments and bills.</p>
          </div>
        </div>

        {/* Analytics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
            <p className="text-slate-500 font-medium mb-1">Monthly Cost</p>
            <h2 className="text-3xl font-black text-slate-800">₹{totalMonthlyCost.toLocaleString()}</h2>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm bg-gradient-to-br from-violet-500 to-indigo-600 text-white">
            <p className="text-violet-100 font-medium mb-1">Yearly Cost (Projection)</p>
            <h2 className="text-3xl font-black text-white">₹{totalYearlyCost.toLocaleString()}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm sticky top-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Add Subscription</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Service Name</label>
                  <input
                    type="text"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all placeholder:text-slate-400"
                    placeholder="Netflix, Spotify, Gym..."
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Monthly Cost (₹)</label>
                  <input
                    type="number"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all placeholder:text-slate-400"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-violet-600/20"
                >
                  <Plus className="w-5 h-5" />
                  <span>Save Subscription</span>
                </button>
              </form>
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Active Services</h3>
              {loading ? (
                <div className="flex justify-center py-10">
                  <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : subscriptions.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200 border-dashed">
                  <CreditCard className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 font-medium">No active subscriptions.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subscriptions.map((sub) => (
                    <div
                      key={sub._id}
                      className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-violet-300 hover:shadow-md transition-all group relative"
                    >
                      <button
                        onClick={() => handleDelete(sub._id)}
                        className="absolute top-4 right-4 p-2 bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center mb-4">
                            {sub.title.charAt(0).toUpperCase()}
                          </div>
                          <h4 className="text-slate-800 font-bold text-lg leading-tight">{sub.title}</h4>
                          <div className="flex items-center text-slate-400 text-sm mt-2">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>Billed Monthly</span>
                          </div>
                        </div>
                        <div className="mt-6">
                          <span className="text-violet-600 font-black text-2xl">₹{sub.amount.toLocaleString()}</span>
                          <span className="text-slate-500 text-sm">/mo</span>
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
