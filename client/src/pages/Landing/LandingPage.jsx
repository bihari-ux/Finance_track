import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Navbar from '../../components/layouts/Navbar';
import { PieChart, TrendingUp, ShieldCheck, Coins, Megaphone, Globe, CheckCircle } from 'lucide-react';

export default function LandingPage() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-white font-sans overflow-hidden selection:bg-[#12C48B] selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <main className="relative min-h-[calc(100vh-60px)] mt-[60px] flex items-center justify-center px-6 sm:px-12 lg:px-24 w-full">
        
        {/* Background Decorative Circle */}
        <div className="absolute top-0 right-0 -z-10 translate-x-[20%] -translate-y-[10%] opacity-20 pointer-events-none hidden md:block">
          <svg width="880" height="880" viewBox="0 0 880 880" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="440" cy="440" r="439.5" stroke="url(#paint0_linear)" strokeWidth="1"/>
            <defs>
              <linearGradient id="paint0_linear" x1="180" y1="6" x2="114" y2="807" gradientUnits="userSpaceOnUse">
                <stop stopColor="#12C48B"/>
                <stop offset="1" stopColor="white"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 w-full">
          
          {/* Left Content */}
          <div className="w-full lg:w-[45%] text-center lg:text-left z-10 pt-10">
            <h1 className="text-[44px] sm:text-[56px] lg:text-[64px] font-black text-[#283139] leading-[1.1] tracking-tight mb-6">
              The only app that <br/>
              <span className="text-[#12C48B]">gets your money into shape</span>
            </h1>
            
            <p className="text-[19px] text-[#4A5560] leading-[1.6] mb-10 max-w-xl mx-auto lg:mx-0 font-medium">
              Manage all your money with ease from one place with Fintriq. Track your income and expenses, analyze your financial habits and stick to your budgets.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              {isAuthenticated ? (
                <Link to="/dashboard" className="w-full sm:w-auto bg-[#12C48B] hover:bg-[#0fa876] text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_8px_24px_rgba(18,196,139,0.3)] hover:shadow-[0_12px_32px_rgba(18,196,139,0.4)] hover:-translate-y-1 text-center">
                  Open Tracker Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/signup" className="w-full sm:w-auto bg-[#12C48B] hover:bg-[#0fa876] text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_8px_24px_rgba(18,196,139,0.3)] hover:shadow-[0_12px_32px_rgba(18,196,139,0.4)] hover:-translate-y-1 text-center">
                    Get Started for Free
                  </Link>
                  <Link to="/login" className="w-full sm:w-auto bg-white border-2 border-gray-200 hover:border-gray-300 text-[#4A5560] px-8 py-4 rounded-full font-bold text-lg transition-all hover:bg-gray-50 text-center">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="w-full lg:w-[55%] relative z-10 mt-8 lg:mt-0">
            {/* Abstract Green Shape Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10">
              <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-80" style={{ filter: 'blur(40px)' }}>
                <path fill="#12C48B" d="M38.5,-64.5C51.5,-52.1,64.8,-42.6,73.4,-29.4C82,-16.1,85.9,0.8,81.3,15.5C76.8,30.3,63.9,42.8,50.8,54.7C37.8,66.6,24.6,77.9,10,76.3C-4.5,74.7,-17.7,60.1,-32.1,50.1C-46.4,40,-61.9,34.4,-70.5,23.3C-79.1,12.1,-80.7,-4.6,-74.6,-18C-68.5,-31.4,-54.6,-41.4,-41.7,-53.8C-28.7,-66.3,-14.4,-81.1,0.5,-81.8C15.3,-82.5,30.7,-69,38.5,-64.5Z" transform="translate(250 250) scale(3.5)" />
              </svg>
            </div>

            {/* App Mockup */}
            <div className="relative mx-auto w-full max-w-[420px] bg-white rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.12)] border-[8px] border-[#F8F9FA] overflow-hidden">
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <p className="text-gray-500 font-semibold text-sm">Total Balance</p>
                    <h3 className="text-3xl font-black text-[#283139]">₹1,24,500</h3>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <img src="https://ui-avatars.com/api/?name=User&background=12C48B&color=fff" alt="Avatar" className="w-full h-full rounded-full" />
                  </div>
                </div>

                {/* Donut Chart Mockup */}
                <div className="relative w-48 h-48 mx-auto mb-10 mt-4">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full drop-shadow-xl">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F0F3F6" strokeWidth="16" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#12C48B" strokeWidth="16" strokeDasharray="251.2" strokeDashoffset="60" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#FF6FAF" strokeWidth="16" strokeDasharray="251.2" strokeDashoffset="180" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#40C3F9" strokeWidth="16" strokeDasharray="251.2" strokeDashoffset="220" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-[#283139]">76%</span>
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Spent</span>
                  </div>
                </div>

                {/* Transaction List Mockup */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 text-blue-500 rounded-xl flex items-center justify-center">
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                      </div>
                      <div>
                        <p className="font-bold text-[#283139]">Rent</p>
                        <p className="text-xs text-gray-500 font-medium">Housing</p>
                      </div>
                    </div>
                    <span className="font-black text-gray-800">-₹12,000</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 text-green-500 rounded-xl flex items-center justify-center">
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      </div>
                      <div>
                        <p className="font-bold text-[#283139]">Salary</p>
                        <p className="text-xs text-gray-500 font-medium">Income</p>
                      </div>
                    </div>
                    <span className="font-black text-[#12C48B]">+₹85,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <div className="mt-16 pt-20 border-t border-gray-100 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8" id="features">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-black text-[#283139] mb-4">Everything you need to manage your money</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">Fintriq provides a comprehensive suite of tools to help you track, analyze, and optimize your personal finances.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-center group">
            <div className="w-20 h-20 mx-auto bg-[#E1F2D8] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <PieChart className="w-10 h-10 text-[#12C48B]" />
            </div>
            <h3 className="text-xl font-bold text-[#283139] mb-3">See all your money in one place</h3>
            <p className="text-gray-500 leading-relaxed">Connect your bank accounts, e-wallets, and crypto to get a full picture of your finances effortlessly.</p>
          </div>

          <div className="text-center group">
            <div className="w-20 h-20 mx-auto bg-[#FDF0E3] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-10 h-10 text-[#FFC053]" />
            </div>
            <h3 className="text-xl font-bold text-[#283139] mb-3">Organize & analyze your expenses</h3>
            <p className="text-gray-500 leading-relaxed">Your expenses are automatically categorized. See exactly where your money goes with beautiful charts.</p>
          </div>

          <div className="text-center group">
            <div className="w-20 h-20 mx-auto bg-[#FFE1ED] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <ShieldCheck className="w-10 h-10 text-[#FF6FAF]" />
            </div>
            <h3 className="text-xl font-bold text-[#283139] mb-3">Bank-level security</h3>
            <p className="text-gray-500 leading-relaxed">We use the same 256-bit encryption as banks to ensure your financial data is completely secure.</p>
          </div>
        </div>
      </div>

      {/* Advanced Capabilities Section (Crypto, Marketing, SEO) */}
      <div className="mt-32 pt-20 pb-32 border-t border-gray-100 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8" id="advanced">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-black text-[#283139] mb-4">Beyond Simple Tracking</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">Fintriq isn't just about recording expenses. We offer advanced tools for modern wealth building and business management.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Crypto Section */}
          <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-[0_12px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_24px_48px_rgba(0,0,0,0.06)] transition-all duration-300 group">
            <div className="w-16 h-16 bg-[#F3EEFF] rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-300">
              <Coins className="w-8 h-8 text-[#8B5CF6]" />
            </div>
            <h3 className="text-2xl font-bold text-[#283139] mb-4">Crypto Portfolio</h3>
            <p className="text-gray-500 leading-relaxed mb-6">Track your Bitcoin, Ethereum, and altcoins. We bring your entire digital wealth into one beautiful dashboard.</p>
            <ul className="space-y-3">
              <li className="flex items-center text-sm font-semibold text-[#4A5560]"><CheckCircle className="w-4 h-4 text-[#8B5CF6] mr-2" /> Live Market Prices</li>
              <li className="flex items-center text-sm font-semibold text-[#4A5560]"><CheckCircle className="w-4 h-4 text-[#8B5CF6] mr-2" /> Portfolio Balance</li>
              <li className="flex items-center text-sm font-semibold text-[#4A5560]"><CheckCircle className="w-4 h-4 text-[#8B5CF6] mr-2" /> P&L Analysis</li>
            </ul>
          </div>

          {/* Marketing Section */}
          <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-[0_12px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_24px_48px_rgba(0,0,0,0.06)] transition-all duration-300 group">
            <div className="w-16 h-16 bg-[#FFEFE5] rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-300">
              <Megaphone className="w-8 h-8 text-[#FF7A00]" />
            </div>
            <h3 className="text-2xl font-bold text-[#283139] mb-4">Marketing Budgets</h3>
            <p className="text-gray-500 leading-relaxed mb-6">For freelancers and business owners: easily separate personal from business. Track ad spend seamlessly.</p>
            <ul className="space-y-3">
              <li className="flex items-center text-sm font-semibold text-[#4A5560]"><CheckCircle className="w-4 h-4 text-[#FF7A00] mr-2" /> Ad Spend Tracking</li>
              <li className="flex items-center text-sm font-semibold text-[#4A5560]"><CheckCircle className="w-4 h-4 text-[#FF7A00] mr-2" /> Project Budgets</li>
              <li className="flex items-center text-sm font-semibold text-[#4A5560]"><CheckCircle className="w-4 h-4 text-[#FF7A00] mr-2" /> Expense Reports</li>
            </ul>
          </div>

          {/* SEO Section */}
          <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-[0_12px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_24px_48px_rgba(0,0,0,0.06)] transition-all duration-300 group">
            <div className="w-16 h-16 bg-[#E0F7FA] rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-300">
              <Globe className="w-8 h-8 text-[#00BCD4]" />
            </div>
            <h3 className="text-2xl font-bold text-[#283139] mb-4">SEO & SaaS Costs</h3>
            <p className="text-gray-500 leading-relaxed mb-6">Monitor your subscriptions to SaaS tools. Get alerts before auto-renewals hit your credit card.</p>
            <ul className="space-y-3">
              <li className="flex items-center text-sm font-semibold text-[#4A5560]"><CheckCircle className="w-4 h-4 text-[#00BCD4] mr-2" /> Subscription Alerts</li>
              <li className="flex items-center text-sm font-semibold text-[#4A5560]"><CheckCircle className="w-4 h-4 text-[#00BCD4] mr-2" /> Cost Optimization</li>
              <li className="flex items-center text-sm font-semibold text-[#4A5560]"><CheckCircle className="w-4 h-4 text-[#00BCD4] mr-2" /> Recurring Billing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

