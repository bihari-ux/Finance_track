import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layouts/Sidebar';
import { getTransactions, addTransaction, updateTransaction, deleteTransaction } from '../../utils/api';
import { HandCoins, Plus, Trash2, Edit2, X, Users } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment';

export default function Receivables() {
  const [receivables, setReceivables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: '', amount: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchReceivables();
  }, []);

  const fetchReceivables = async () => {
    try {
      const res = await getTransactions();
      const receivablesData = res.data.data.filter((t) => t.type === 'expense' && t.category === 'Loan Given');
      setReceivables(receivablesData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching receivables:', error);
      toast.error('Failed to load receivables data');
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
          category: 'Loan Given'
        });
        setReceivables(receivables.map((exp) => (exp._id === editingId ? res.data.data : exp)));
        toast.success('Record updated successfully!');
        setEditingId(null);
      } else {
        const res = await addTransaction({
          ...formData,
          amount: Number(formData.amount),
          type: 'expense',
          category: 'Loan Given'
        });
        setReceivables([res.data.data, ...receivables]);
        toast.success('Record added successfully!');
      }
      setFormData({ title: '', amount: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to process record');
      console.error(error);
    }
  };

  const handleEdit = (receivable) => {
    setEditingId(receivable._id);
    setFormData({
      title: receivable.title,
      amount: receivable.amount,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ title: '', amount: '' });
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      setReceivables(receivables.filter((e) => e._id !== id));
      toast.success('Record deleted');
    } catch (error) {
      toast.error('Failed to delete record');
      console.error(error);
    }
  };

  return (
    <Sidebar>
      <Toaster position="top-right" />
      <div className="w-full space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 rounded-xl shadow-sm border" style={{ background: '#E1F2D8', borderColor: 'rgba(18,196,139,0.2)' }}>
            <HandCoins className="w-8 h-8" style={{ color: '#12C48B' }} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: '#0E1A22' }}>Receivables</h1>
            <p className="mt-1" style={{ color: '#4A5560' }}>Track money you've given to others that needs to be collected.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white border rounded-2xl p-6 shadow-sm sticky top-8" style={{ borderColor: '#E5ECF0' }}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold" style={{ color: '#0E1A22' }}>
                  {editingId ? 'Edit Record' : 'Add New Loan Given'}
                </h3>
                {editingId && (
                  <button onClick={handleCancelEdit} className="p-1 rounded-full transition-colors" style={{ color: '#4A5560' }} onMouseEnter={e => e.currentTarget.style.background = '#F6F8FA'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#283139' }}>Person's Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Users className="h-5 w-5" style={{ color: '#8FA3B0' }} />
                    </div>
                    <input
                      type="text"
                      className="w-full border rounded-xl pl-10 pr-4 py-3 focus:outline-none transition-all"
                      style={{ background: '#F6F8FA', borderColor: '#E5ECF0', color: '#0E1A22' }}
                      onFocus={e => { e.currentTarget.style.borderColor = '#12C48B'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(18,196,139,0.2)'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = '#E5ECF0'; e.currentTarget.style.boxShadow = 'none'; }}
                      placeholder="e.g. Rahul, John"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
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
                      <span>Update Record</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      <span>Save Record</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white border rounded-2xl p-6 shadow-sm" style={{ borderColor: '#E5ECF0' }}>
              <h3 className="text-xl font-bold mb-6" style={{ color: '#0E1A22' }}>People Who Owe You</h3>
              {loading ? (
                <div className="flex justify-center py-10">
                  <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#12C48B', borderTopColor: 'transparent' }}></div>
                </div>
              ) : receivables.length === 0 ? (
                <div className="text-center py-12 rounded-xl border border-dashed" style={{ background: '#F6F8FA', borderColor: '#E5ECF0' }}>
                  <HandCoins className="w-12 h-12 mx-auto mb-3" style={{ color: '#8FA3B0' }} />
                  <p className="font-medium" style={{ color: '#4A5560' }}>No receivable records found.</p>
                  <p className="text-sm mt-1" style={{ color: '#8FA3B0' }}>Add your first record using the form.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {receivables.map((receivable) => (
                    <div
                      key={receivable._id}
                      className="flex items-center justify-between p-4 rounded-xl border shadow-sm transition-all group"
                      style={{ 
                        borderColor: 'rgba(18,196,139,0.3)',
                        backgroundColor: '#F5FBF7'
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#E1F2D8'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F5FBF7'}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-3 rounded-xl" style={{ background: '#E1F2D8', color: '#12C48B' }}>
                          <HandCoins className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg" style={{ color: '#0E1A22' }}>{receivable.title}</h4>
                          <div className="flex items-center space-x-2 text-sm mt-0.5" style={{ color: '#8FA3B0' }}>
                            <span className="font-medium px-2 py-0.5 rounded-md" style={{ background: '#fff', color: '#12C48B', border: '1px solid rgba(18,196,139,0.2)' }}>Receivable</span>
                            <span>•</span>
                            <span>{moment(receivable.createdAt).format('MMM Do, h:mm a')}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col items-end">
                          <span className="font-black text-xl" style={{ color: '#12C48B' }}>
                            ₹{receivable.amount.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEdit(receivable)}
                            className="p-2 rounded-lg transition-colors"
                            style={{ color: '#40C3F9' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#e0f2fe'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            title="Edit Record"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(receivable._id)}
                            className="p-2 rounded-lg transition-colors"
                            style={{ color: '#FF6FAF' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#fce7f3'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            title="Delete Record"
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
