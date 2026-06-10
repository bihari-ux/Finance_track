import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
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
      
      let htmlContent = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8" /><style>table { font-family: Arial; border-collapse: collapse; } th, td { border: 1px solid #ddd; padding: 8px; text-align: left; } th { background-color: #f2f2f2; }</style></head><body>`;
      htmlContent += `<table><tr><th>Date</th><th>Type</th><th>Category</th><th>Amount</th><th>Description</th></tr>`;
      
      data.forEach(row => {
        const date = new Date(row.createdAt).toLocaleDateString();
        const type = row.type ? row.type.toUpperCase() : '';
        const descText = row.title || row.text || '';
        htmlContent += `<tr><td>${date}</td><td>${type}</td><td>${row.category || ''}</td><td>${row.amount}</td><td>${descText}</td></tr>`;
      });
      htmlContent += `</table></body></html>`;
      
      const blob = new Blob([htmlContent], { type: 'application/vnd.ms-excel' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "Fintriq_Export.xls");
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

  const activeLinkClass = "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium bg-[#12C48B]/10 text-[#12C48B] shadow-sm border border-[#12C48B]/20";
  const inactiveLinkClass = "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-[#4A5560] hover:bg-[#F6F8FA] hover:text-[#283139]";

  return (
    <div className="flex h-screen text-[#283139] font-sans" style={{ background: '#F6F8FA' }}>
      <Toaster position="top-right" />
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col shadow-sm z-10 relative" style={{ borderColor: '#E5ECF0' }}>
        <Link to="/" className="p-6 flex items-center space-x-3 cursor-pointer group">
          <div className="p-2 rounded-xl shadow-lg transition-transform duration-200 group-hover:scale-105" style={{ background: '#12C48B', boxShadow: '0 4px 14px rgba(18,196,139,0.3)' }}>
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight transition-colors" style={{ color: '#0E1A22' }}>
            Fintriq
          </span>
        </Link>

        <nav className="flex-1 px-4 space-y-2 mt-6 overflow-y-auto">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/income" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
            <ArrowUpCircle className="w-5 h-5" />
            <span>Income</span>
          </NavLink>

          <NavLink to="/expense" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
            <ArrowDownCircle className="w-5 h-5" />
            <span>Expenses</span>
          </NavLink>

          <NavLink to="/budget" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
            <Target className="w-5 h-5" />
            <span>Budget</span>
          </NavLink>

          <NavLink to="/subscriptions" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
            <CreditCard className="w-5 h-5" />
            <span>Subscriptions</span>
          </NavLink>

          <NavLink to="/investment" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
            <TrendingUp className="w-5 h-5" />
            <span>Investments</span>
          </NavLink>

          <NavLink to="/marketing" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
            <Megaphone className="w-5 h-5" />
            <span>Marketing</span>
          </NavLink>
        </nav>

        <div className="p-4 border-t space-y-2" style={{ borderColor: '#E5ECF0', background: '#F8FBFA' }}>
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl transition-all duration-200 font-medium"
            style={{ color: '#4A5560' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#12C48B15'; e.currentTarget.style.color = '#12C48B'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#4A5560'; }}
          >
            <Download className="w-5 h-5" />
            <span>Export Data</span>
          </button>
          
          <button
            onClick={toggleDarkMode}
            className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl transition-all duration-200 font-medium"
            style={{ color: '#4A5560' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#12C48B15'; e.currentTarget.style.color = '#12C48B'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#4A5560'; }}
          >
            <Moon className="w-5 h-5" />
            <span>Dark Mode</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl transition-all duration-200 font-medium"
            style={{ color: '#4A5560' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#ffe4e6'; e.currentTarget.style.color = '#e11d48'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#4A5560'; }}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8" style={{ background: '#F6F8FA' }}>
        {children}
      </main>
    </div>
  );
}
