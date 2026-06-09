import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, ArrowUpCircle, ArrowDownCircle, LogOut, Wallet, TrendingUp, Megaphone, Download, Moon, Target, CreditCard } from 'lucide-react';
import { getTransactions } from '../../utils/api';
import toast, { Toaster } from 'react-hot-toast';

export default function Sidebar({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleExportCSV = async () => {
    try {
      const toastId = toast.loading('Generating your report...');
      const res = await getTransactions();
      const data = res.data.data;
      
      let csvContent = "Date,Type,Category,Amount,Description\n";
      
      data.forEach(row => {
        const date = new Date(row.createdAt).toLocaleDateString();
        const type = row.type.toUpperCase();
        const desc = `"${row.text.replace(/"/g, '""')}"`;
        csvContent += `${date},${type},${row.category},${row.amount},${desc}\n`;
      });
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "FinTrack_Export.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Data exported successfully!', { id: toastId });
    } catch (error) {
      console.error('Export failed', error);
      toast.error('Failed to export data');
    }
  };

  const toggleDarkMode = () => {
    toast('Dark Mode is coming soon!', { icon: '🌙' });
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      <Toaster position="top-right" />
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shadow-sm z-10 relative">
        <div className="p-6 flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-600/20">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black text-slate-800 tracking-tight">
            FinTrack
          </span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-6 overflow-y-auto">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/income"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                isActive
                  ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-100'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            <ArrowUpCircle className="w-5 h-5" />
            <span>Income</span>
          </NavLink>

          <NavLink
            to="/expense"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                isActive
                  ? 'bg-rose-50 text-rose-700 shadow-sm border border-rose-100'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            <ArrowDownCircle className="w-5 h-5" />
            <span>Expenses</span>
          </NavLink>

          <NavLink
            to="/budget"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                isActive
                  ? 'bg-amber-50 text-amber-700 shadow-sm border border-amber-100'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            <Target className="w-5 h-5" />
            <span>Budget</span>
          </NavLink>

          <NavLink
            to="/subscriptions"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                isActive
                  ? 'bg-violet-50 text-violet-700 shadow-sm border border-violet-100'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            <CreditCard className="w-5 h-5" />
            <span>Subscriptions</span>
          </NavLink>

          <NavLink
            to="/investment"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            <TrendingUp className="w-5 h-5" />
            <span>Investments</span>
          </NavLink>

          <NavLink
            to="/marketing"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                isActive
                  ? 'bg-pink-50 text-pink-700 shadow-sm border border-pink-100'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            <Megaphone className="w-5 h-5" />
            <span>Marketing</span>
          </NavLink>
        </nav>

        <div className="p-4 border-t border-slate-200 bg-slate-50/50 space-y-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200 font-medium"
          >
            <Download className="w-5 h-5" />
            <span>Export Data</span>
          </button>
          
          <button
            onClick={toggleDarkMode}
            className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 font-medium"
          >
            <Moon className="w-5 h-5" />
            <span>Dark Mode</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all duration-200 font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-50 p-8">
        {children}
      </main>
    </div>
  );
}
