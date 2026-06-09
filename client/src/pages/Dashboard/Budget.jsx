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
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-amber-100 rounded-xl shadow-sm border border-amber-200">
            <Target className="w-8 h-8 text-amber-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Budget Planner</h1>
            <p className="text-slate-500 mt-1">Set monthly limits and track your spending goals.</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Target className="w-48 h-48" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold text-slate-500 uppercase tracking-wider">Monthly Limit</h3>
                {isEditingBudget ? (
                  <div className="flex items-center mt-2 space-x-3">
                    <div className="relative">
                      <span className="absolute left-4 top-3 font-bold text-slate-400">₹</span>
                      <input 
                        type="number"
                        value={tempBudget}
                        onChange={(e) => setTempBudget(Number(e.target.value))}
                        className="pl-8 pr-4 py-2 border-2 border-indigo-500 rounded-xl font-bold text-xl outline-none"
                        autoFocus
                      />
                    </div>
                    <button onClick={handleSaveBudget} className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-700">Save</button>
                    <button onClick={() => setIsEditingBudget(false)} className="text-slate-500 hover:text-slate-700 font-medium px-2">Cancel</button>
                  </div>
                ) : (
                  <div className="flex items-center mt-1 group">
                    <h2 className="text-4xl font-black text-slate-800">₹{monthlyBudget.toLocaleString()}</h2>
                    <button 
                      onClick={() => setIsEditingBudget(true)}
                      className="ml-4 text-sm font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-50 px-3 py-1 rounded-lg hover:bg-indigo-100"
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
                  <p className="text-slate-500 font-medium mb-1">Spent so far</p>
                  <p className="text-2xl font-bold text-slate-800">₹{currentMonthExpenses.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-500 font-medium mb-1">Remaining</p>
                  <p className={`text-2xl font-bold ${isOverBudget ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {isOverBudget ? '- ' : ''}₹{Math.abs(monthlyBudget - currentMonthExpenses).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    budgetPercentage > 90 ? 'bg-rose-500' : 
                    budgetPercentage > 75 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${budgetPercentage}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm font-bold text-slate-400">0%</span>
                <span className={`text-sm font-bold ${isOverBudget ? 'text-rose-500' : 'text-slate-600'}`}>
                  {budgetPercentage.toFixed(1)}% Used
                </span>
                <span className="text-sm font-bold text-slate-400">100%</span>
              </div>
            </div>

            {isOverBudget ? (
              <div className="mt-8 bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-rose-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-rose-800">Budget Exceeded!</h4>
                  <p className="text-rose-600 text-sm mt-1">You have spent more than your monthly limit. Please review your expenses.</p>
                </div>
              </div>
            ) : (
              <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start space-x-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-emerald-800">On Track</h4>
                  <p className="text-emerald-600 text-sm mt-1">Great job! Your spending is well within your budget limit.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
