import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layouts/Sidebar';
import { getTransactions } from '../../utils/api';
import { Target, AlertCircle, CheckCircle2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function Budget() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthlyBudget, setMonthlyBudget] = useState(() => {
    const saved = localStorage.getItem('monthlyBudget');
    return saved ? Number(saved) : 50000;
  });
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [tempBudget, setTempBudget] = useState(monthlyBudget);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await getTransactions();
      setTransactions(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load budget data');
      setLoading(false);
    }
  };

  const handleSaveBudget = () => {
    setMonthlyBudget(tempBudget);
    localStorage.setItem('monthlyBudget', tempBudget);
    setIsEditingBudget(false);
    toast.success('Budget limit updated!');
  };

  // Calculate current month's expenses
  const currentMonthExpenses = transactions
    .filter(t => {
      const date = new Date(t.createdAt);
      const now = new Date();
      return (t.type === 'expense' || t.type === 'marketing') && 
             date.getMonth() === now.getMonth() && 
             date.getFullYear() === now.getFullYear();
    })
    .reduce((acc, curr) => acc + curr.amount, 0);

  const budgetPercentage = Math.min((currentMonthExpenses / monthlyBudget) * 100, 100);
  const isOverBudget = currentMonthExpenses > monthlyBudget;

  if (loading) {
    return (
      <Sidebar>
        <div className="flex items-center justify-center h-full">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <Toaster position="top-right" />
      <div className="w-full space-y-8 animate-in fade-in duration-500 pb-10">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 rounded-xl shadow-sm border" style={{ background: '#E0F7FA', borderColor: 'rgba(0,188,212,0.2)' }}>
            <Target className="w-8 h-8" style={{ color: '#00BCD4' }} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: '#0E1A22' }}>Budget Planner</h1>
            <p className="mt-1" style={{ color: '#4A5560' }}>Set monthly limits and track your spending goals.</p>
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-8 shadow-sm relative overflow-hidden" style={{ borderColor: '#E5ECF0' }}>
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Target className="w-48 h-48" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wider" style={{ color: '#8FA3B0' }}>Monthly Limit</h3>
                {isEditingBudget ? (
                  <div className="flex items-center mt-2 space-x-3">
                    <div className="relative">
                      <span className="absolute left-4 top-3 font-bold" style={{ color: '#8FA3B0' }}>₹</span>
                      <input 
                        type="number"
                        value={tempBudget}
                        onChange={(e) => setTempBudget(Number(e.target.value))}
                        className="pl-8 pr-4 py-2 border-2 rounded-xl font-bold text-xl outline-none"
                        style={{ borderColor: '#12C48B', color: '#0E1A22' }}
                        autoFocus
                      />
                    </div>
                    <button onClick={handleSaveBudget} className="text-white px-4 py-2 rounded-xl font-medium transition-colors" style={{ background: '#12C48B' }} onMouseEnter={e => e.currentTarget.style.background = '#0fa876'} onMouseLeave={e => e.currentTarget.style.background = '#12C48B'}>Save</button>
                    <button onClick={() => setIsEditingBudget(false)} className="font-medium px-2 transition-colors" style={{ color: '#4A5560' }} onMouseEnter={e => e.currentTarget.style.color = '#0E1A22'} onMouseLeave={e => e.currentTarget.style.color = '#4A5560'}>Cancel</button>
                  </div>
                ) : (
                  <div className="flex items-center mt-1 group">
                    <h2 className="text-4xl font-black" style={{ color: '#0E1A22' }}>₹{monthlyBudget.toLocaleString()}</h2>
                    <button 
                      onClick={() => setIsEditingBudget(true)}
                      className="ml-4 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 rounded-lg"
                      style={{ background: '#E1F2D8', color: '#12C48B' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(18,196,139,0.2)'}
                      onMouseLeave={e => e.currentTarget.style.background = '#E1F2D8'}
                    >
                      Edit Limit
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="font-medium mb-1" style={{ color: '#4A5560' }}>Spent so far</p>
                  <p className="text-2xl font-bold" style={{ color: '#0E1A22' }}>₹{currentMonthExpenses.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium mb-1" style={{ color: '#4A5560' }}>Remaining</p>
                  <p className={`text-2xl font-bold`} style={{ color: isOverBudget ? '#FF6FAF' : '#12C48B' }}>
                    {isOverBudget ? '- ' : ''}₹{Math.abs(monthlyBudget - currentMonthExpenses).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="h-4 w-full rounded-full overflow-hidden" style={{ background: '#F6F8FA' }}>
                <div 
                  className={`h-full transition-all duration-1000`}
                  style={{ width: `${budgetPercentage}%`, background: budgetPercentage > 90 ? '#FF6FAF' : budgetPercentage > 75 ? '#FFC053' : '#12C48B' }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm font-bold" style={{ color: '#8FA3B0' }}>0%</span>
                <span className={`text-sm font-bold`} style={{ color: isOverBudget ? '#FF6FAF' : '#4A5560' }}>
                  {budgetPercentage.toFixed(1)}% Used
                </span>
                <span className="text-sm font-bold" style={{ color: '#8FA3B0' }}>100%</span>
              </div>
            </div>

            {isOverBudget ? (
              <div className="mt-8 border rounded-xl p-4 flex items-start space-x-3" style={{ background: '#FFE1ED', borderColor: 'rgba(255,111,175,0.2)' }}>
                <AlertCircle className="w-6 h-6 shrink-0" style={{ color: '#FF6FAF' }} />
                <div>
                  <h4 className="font-bold" style={{ color: '#0E1A22' }}>Budget Exceeded!</h4>
                  <p className="text-sm mt-1" style={{ color: '#4A5560' }}>You have spent more than your monthly limit. Please review your expenses.</p>
                </div>
              </div>
            ) : (
              <div className="mt-8 border rounded-xl p-4 flex items-start space-x-3" style={{ background: '#E1F2D8', borderColor: 'rgba(18,196,139,0.2)' }}>
                <CheckCircle2 className="w-6 h-6 shrink-0" style={{ color: '#12C48B' }} />
                <div>
                  <h4 className="font-bold" style={{ color: '#0E1A22' }}>On Track</h4>
                  <p className="text-sm mt-1" style={{ color: '#4A5560' }}>Great job! Your spending is well within your budget limit.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
