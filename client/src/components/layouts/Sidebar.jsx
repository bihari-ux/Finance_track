import React, { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { Home, ArrowUpCircle, ArrowDownCircle, LogOut, Wallet, TrendingUp, Megaphone, Download, Moon, Target, CreditCard, HandCoins, Menu, X } from 'lucide-react';
import { getTransactions } from '../../utils/api';
import toast, { Toaster } from 'react-hot-toast';

export default function Sidebar({ children }) {
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleExportCSV = async () => {
    try {
      const toastId = toast.loading('Generating your report...');
      const res = await getTransactions();
      const data = res.data.data;
      const monthName = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
      const token = localStorage.getItem('token');
      let userName = "Valued User";
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          if (payload.name) userName = payload.name;
        } catch(e) {}
      }

      let htmlContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8" />
      </head>
      <body style="font-family: Arial, sans-serif;">
        <table style="border-collapse: collapse; width: 100%;">
          <tr>
            <td colspan="3" style="border: none; padding-bottom: 20px; font-size: 22px; font-weight: bold; color: #0E1A22; text-align: left;">${userName}'s Financial Report</td>
            <td colspan="2" style="border: none; padding-bottom: 20px; font-size: 16px; color: #4A5560; font-weight: bold; text-align: right;">Month: ${monthName}</td>
          </tr>
          <tr>
            <th style="background-color: #12C48B; color: white; padding: 12px; border: 1px solid #ddd; text-align: left; font-size: 14px;">Date</th>
            <th style="background-color: #12C48B; color: white; padding: 12px; border: 1px solid #ddd; text-align: left; font-size: 14px;">Type</th>
            <th style="background-color: #12C48B; color: white; padding: 12px; border: 1px solid #ddd; text-align: left; font-size: 14px;">Category</th>
            <th style="background-color: #12C48B; color: white; padding: 12px; border: 1px solid #ddd; text-align: left; font-size: 14px;">Amount (₹)</th>
            <th style="background-color: #12C48B; color: white; padding: 12px; border: 1px solid #ddd; text-align: left; font-size: 14px;">Description</th>
          </tr>
      `;
      
      data.forEach(row => {
        const date = new Date(row.createdAt).toLocaleDateString();
        const type = row.type ? row.type.toUpperCase() : '';
        const descText = row.title || row.text || '';
        const amountColor = type === 'INCOME' ? '#12C48B' : '#FF6FAF';
        const sign = type === 'INCOME' ? '+' : '-';
        
        htmlContent += `
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; color: #283139;">${date}</td>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; color: #4A5560;">${type}</td>
            <td style="padding: 10px; border: 1px solid #ddd; color: #283139;">${row.category || ''}</td>
            <td style="padding: 10px; border: 1px solid #ddd; color: ${amountColor}; font-weight: bold;">${sign}₹${row.amount.toLocaleString()}</td>
            <td style="padding: 10px; border: 1px solid #ddd; color: #283139;">${descText}</td>
          </tr>
        `;
      });
      htmlContent += `</table></body></html>`;
      
      const blob = new Blob([htmlContent], { type: 'application/vnd.ms-excel' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `Fintriq_Export_${monthName.replace(' ', '_')}.xls`);
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
    <div className="flex h-screen text-[#283139] font-sans overflow-hidden" style={{ background: '#F6F8FA' }}>
      <Toaster position="top-right" />
      
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-[#0E1A22]/40 backdrop-blur-sm z-40 md:hidden transition-opacity" 
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r flex flex-col shadow-2xl md:shadow-sm md:relative transform transition-transform duration-300 ease-in-out ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`} style={{ borderColor: '#E5ECF0' }}>
        <div className="flex items-center justify-between p-4 md:p-6 group border-b md:border-none" style={{ borderColor: '#F0F3F6' }}>
          <Link to="/" className="flex items-center space-x-3 cursor-pointer" onClick={() => setIsMobileOpen(false)}>
            <div className="p-2 rounded-xl shadow-lg transition-transform duration-200 group-hover:scale-105" style={{ background: '#12C48B', boxShadow: '0 4px 14px rgba(18,196,139,0.3)' }}>
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight transition-colors" style={{ color: '#0E1A22' }}>
              Fintriq
            </span>
          </Link>
          <button className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg" onClick={() => setIsMobileOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-2 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style>{`.flex-1::-webkit-scrollbar { display: none; }`}</style>
          <NavLink to="/dashboard" onClick={() => setIsMobileOpen(false)} className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/income" onClick={() => setIsMobileOpen(false)} className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
            <ArrowUpCircle className="w-5 h-5" />
            <span>Income</span>
          </NavLink>

          <NavLink to="/expense" onClick={() => setIsMobileOpen(false)} className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
            <ArrowDownCircle className="w-5 h-5" />
            <span>Expenses</span>
          </NavLink>

          <NavLink to="/receivables" onClick={() => setIsMobileOpen(false)} className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
            <HandCoins className="w-5 h-5" />
            <span>Receivables</span>
          </NavLink>

          <NavLink to="/budget" onClick={() => setIsMobileOpen(false)} className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
            <Target className="w-5 h-5" />
            <span>Budget</span>
          </NavLink>

          <NavLink to="/subscriptions" onClick={() => setIsMobileOpen(false)} className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
            <CreditCard className="w-5 h-5" />
            <span>Subscriptions</span>
          </NavLink>

          <NavLink to="/investment" onClick={() => setIsMobileOpen(false)} className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
            <TrendingUp className="w-5 h-5" />
            <span>Investments</span>
          </NavLink>

          <NavLink to="/marketing" onClick={() => setIsMobileOpen(false)} className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Top Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white border-b shadow-sm z-20">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg" style={{ background: '#12C48B' }}>
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-[#0E1A22]">Fintriq</span>
          </div>
          <button 
            onClick={() => setIsMobileOpen(true)} 
            className="p-2 -mr-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8" style={{ background: '#F6F8FA' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
