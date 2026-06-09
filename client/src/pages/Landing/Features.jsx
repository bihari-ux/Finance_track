import React from 'react';
import Navbar from '../../components/layouts/Navbar';
import { PieChart, TrendingUp, ShieldCheck, Coins, Megaphone, Globe, CheckCircle } from 'lucide-react';

export default function Features() {
  return (
    <div className="min-h-screen bg-white font-sans overflow-hidden selection:bg-[#12C48B] selection:text-white">
      <Navbar />
      
      <main className="relative pt-[120px] lg:pt-[160px] pb-20 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-[44px] sm:text-[56px] font-black text-[#283139] leading-[1.1] tracking-tight mb-6">
            Powerful Features for <br/><span className="text-[#12C48B]">Absolute Control</span>
          </h1>
          <p className="text-[19px] text-[#4A5560] leading-[1.6] max-w-2xl mx-auto font-medium">
            Discover all the tools you need to manage, grow, and protect your wealth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          <div className="text-center group bg-gray-50 p-8 rounded-[32px] border border-gray-100 hover:shadow-xl transition-all">
            <div className="w-20 h-20 mx-auto bg-[#E1F2D8] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <PieChart className="w-10 h-10 text-[#12C48B]" />
            </div>
            <h3 className="text-xl font-bold text-[#283139] mb-3">See all your money in one place</h3>
            <p className="text-gray-500 leading-relaxed">Connect your bank accounts, e-wallets, and crypto to get a full picture of your finances effortlessly.</p>
          </div>

          <div className="text-center group bg-gray-50 p-8 rounded-[32px] border border-gray-100 hover:shadow-xl transition-all">
            <div className="w-20 h-20 mx-auto bg-[#FDF0E3] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-10 h-10 text-[#FFC053]" />
            </div>
            <h3 className="text-xl font-bold text-[#283139] mb-3">Organize & analyze expenses</h3>
            <p className="text-gray-500 leading-relaxed">Your expenses are automatically categorized. See exactly where your money goes with beautiful charts.</p>
          </div>

          <div className="text-center group bg-gray-50 p-8 rounded-[32px] border border-gray-100 hover:shadow-xl transition-all">
            <div className="w-20 h-20 mx-auto bg-[#FFE1ED] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <ShieldCheck className="w-10 h-10 text-[#FF6FAF]" />
            </div>
            <h3 className="text-xl font-bold text-[#283139] mb-3">Bank-level security</h3>
            <p className="text-gray-500 leading-relaxed">We use the same 256-bit encryption as banks to ensure your financial data is completely secure.</p>
          </div>
        </div>

        <div className="text-center mb-16 mt-32">
          <h2 className="text-3xl lg:text-4xl font-black text-[#283139] mb-4">Advanced Capabilities</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">FinanceTracker+ isn't just about recording expenses. We offer advanced tools for modern wealth building.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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
      </main>
    </div>
  );
}
