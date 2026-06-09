import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/layouts/Sidebar';
import { getTransactions } from '../../utils/api';
import { ArrowUpRight, ArrowDownRight, IndianRupee, TrendingUp, PieChart as PieChartIcon, Activity } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import moment from 'moment';

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await getTransactions();
      setTransactions(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setLoading(false);
    }
  };

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense' || t.type === 'marketing')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalInvestment = transactions
    .filter((t) => t.type === 'investment')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  // Process data for the Area chart
  const processChartData = () => {
    const dataByDate = {};
    const sortedTransactions = [...transactions].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    sortedTransactions.forEach((t) => {
      const date = moment(t.createdAt).format('MMM DD');
      if (!dataByDate[date]) {
        dataByDate[date] = { date, income: 0, expense: 0, investment: 0 };
      }
      if (t.type === 'income') {
        dataByDate[date].income += t.amount;
      } else if (t.type === 'expense' || t.type === 'marketing') {
        dataByDate[date].expense += t.amount;
      } else if (t.type === 'investment') {
        dataByDate[date].investment += t.amount;
      }
    });
    return Object.values(dataByDate);
  };

  // Process data for the Pie chart (Expense Categories)
  const processCategoryData = () => {
    const categoryTotals = {};
    transactions
      .filter((t) => t.type === 'expense' || t.type === 'marketing')
      .forEach((t) => {
        const cat = t.category || 'Other';
        categoryTotals[cat] = (categoryTotals[cat] || 0) + t.amount;
      });
    
    return Object.keys(categoryTotals).map(key => ({
      name: key,
      value: categoryTotals[key]
    })).sort((a, b) => b.value - a.value);
  };

  const chartData = processChartData();
  const categoryData = processCategoryData();

  // Colors for Pie Chart matching Spendee UI
  const COLORS = ['#F5A623', '#E54C7C', '#12C48B', '#4A90E2', '#50E3C2', '#8b5cf6', '#f43f5e', '#64748b'];

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
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
            <p className="text-slate-500 mt-1">Welcome back! Here's your financial overview.</p>
          </div>
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm font-medium text-slate-600">Live Updates</span>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Total Balance Card */}
          <div className="bg-indigo-600 border border-indigo-700 p-6 rounded-2xl relative overflow-hidden group shadow-lg shadow-indigo-600/20">
            <div className="absolute -right-6 -top-6 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
              <IndianRupee className="w-32 h-32 text-white" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-indigo-100 font-medium">Total Balance</p>
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <IndianRupee className="w-5 h-5 text-white" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-white tracking-tight">
                ₹{balance.toLocaleString()}
              </h2>
            </div>
          </div>

          {/* Income Card */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-slate-500 font-medium">Total Income</p>
                <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-100">
                  <ArrowUpRight className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
                ₹{totalIncome.toLocaleString()}
              </h2>
            </div>
          </div>

          {/* Expense Card */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-slate-500 font-medium">Total Expense</p>
                <div className="p-2 bg-rose-50 rounded-lg border border-rose-100">
                  <ArrowDownRight className="w-5 h-5 text-rose-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
                ₹{totalExpense.toLocaleString()}
              </h2>
            </div>
          </div>

          {/* Investment Card */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-slate-500 font-medium">Total Invested</p>
                <div className="p-2 bg-indigo-50 rounded-lg border border-indigo-100">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
                ₹{totalInvestment.toLocaleString()}
              </h2>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Area Chart Section */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-indigo-500" />
                <h3 className="text-lg font-bold text-slate-800">Cash Flow Overview</h3>
              </div>
            </div>
            
            <div className="h-[350px] w-full">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      stroke="#94a3b8" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      dy={10}
                    />
                    <YAxis 
                      stroke="#94a3b8" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => {
                        if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
                        if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
                        if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
                        return `₹${value}`;
                      }}
                    />
                    <Tooltip
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        borderColor: '#e2e8f0',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                      itemStyle={{ color: '#0f172a', fontWeight: 500 }}
                    />
                    <Bar
                      dataKey="income"
                      fill="#12C48B"
                      name="Income"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={40}
                    />
                    <Bar
                      dataKey="expense"
                      fill="#E54C7C"
                      name="Expense"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                  <TrendingUp className="w-12 h-12 mb-4 opacity-30" />
                  <p>No data available yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* Pie Chart Section */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center space-x-2 mb-6">
              <PieChartIcon className="w-5 h-5 text-indigo-500" />
              <h3 className="text-lg font-bold text-slate-800">Expenses by Category</h3>
            </div>
            
            <div className="h-[350px] w-full flex flex-col items-center justify-center">
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="45%"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => `₹${value}`}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                  <PieChartIcon className="w-12 h-12 mb-4 opacity-30" />
                  <p>No expenses to analyze.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Transactions List */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-indigo-500" />
              <h3 className="text-lg font-bold text-slate-800">Recent Transactions</h3>
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {transactions.length > 0 ? (
              transactions.slice(0, 5).map((t) => (
                <div key={t._id} className="p-4 px-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${t.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                      {t.type === 'income' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{t.title}</p>
                      <div className="flex items-center space-x-2 text-sm text-slate-500 mt-0.5">
                        <span className="font-medium">{t.category || 'Other'}</span>
                        <span>•</span>
                        <span>{moment(t.createdAt).fromNow()}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`font-bold text-lg ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString()}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-500">
                No recent transactions found.
              </div>
            )}
          </div>
        </div>

      </div>
    </Sidebar>
  );
}
