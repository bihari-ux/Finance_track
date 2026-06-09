import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <nav className="bg-white fixed w-full z-50 top-0 transition-all duration-300">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-[88px]">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="16" fill="#12C48B"/>
                <path d="M16 6C10.4772 6 6 10.4772 6 16C6 21.5228 10.4772 26 16 26C21.5228 26 26 21.5228 26 16C26 10.4772 21.5228 6 16 6ZM16 22C12.6863 22 10 19.3137 10 16C10 12.6863 12.6863 10 16 10C19.3137 10 22 12.6863 22 16C22 19.3137 19.3137 22 16 22Z" fill="white"/>
                <path d="M22.5 16C22.5 19.5899 19.5899 22.5 16 22.5L16 9.5C19.5899 9.5 22.5 12.4101 22.5 16Z" fill="#00BC7C"/>
                <path d="M9.5 16C9.5 12.4101 12.4101 9.5 16 9.5L16 22.5C12.4101 22.5 9.5 19.5899 9.5 16Z" fill="#40C3F9"/>
              </svg>
              <span className="text-[26px] font-black tracking-tight text-[#344554]">FinanceTracker+</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/features" className="text-[#4A5560] hover:text-[#12C48B] font-semibold text-[15px] transition-colors">Features</Link>
            <Link to="/pricing" className="text-[#4A5560] hover:text-[#12C48B] font-semibold text-[15px] transition-colors">Pricing</Link>
            <Link to="/about" className="text-[#4A5560] hover:text-[#12C48B] font-semibold text-[15px] transition-colors">About us</Link>
            
            <div className="flex items-center space-x-6 ml-4 border-l border-gray-200 pl-6">
              {isAuthenticated ? (
                <>
                  <button onClick={() => { localStorage.removeItem('token'); window.location.href='/'; }} className="text-[#4A5560] hover:text-red-500 font-bold text-[15px] transition-colors">
                    Logout
                  </button>
                  <Link to="/dashboard" className="bg-[#12C48B] hover:bg-[#0fa876] text-white px-7 py-3 rounded-full font-bold text-[15px] transition-all shadow-[0_4px_14px_rgba(18,196,139,0.3)] hover:shadow-[0_6px_20px_rgba(18,196,139,0.4)] hover:-translate-y-0.5">
                    Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-[#4A5560] hover:text-[#12C48B] font-bold text-[15px] transition-colors">
                    Login
                  </Link>
                  <Link to="/signup" className="bg-[#12C48B] hover:bg-[#0fa876] text-white px-7 py-3 rounded-full font-bold text-[15px] transition-all shadow-[0_4px_14px_rgba(18,196,139,0.3)] hover:shadow-[0_6px_20px_rgba(18,196,139,0.4)] hover:-translate-y-0.5">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#4A5560] hover:text-[#12C48B] focus:outline-none"
            >
              {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 pt-4 pb-6 space-y-4 shadow-xl">
          <Link to="/features" className="block px-4 py-3 text-[#4A5560] font-bold text-lg hover:bg-gray-50 rounded-xl" onClick={() => setIsMenuOpen(false)}>Features</Link>
          <Link to="/pricing" className="block px-4 py-3 text-[#4A5560] font-bold text-lg hover:bg-gray-50 rounded-xl" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
          <Link to="/about" className="block px-4 py-3 text-[#4A5560] font-bold text-lg hover:bg-gray-50 rounded-xl" onClick={() => setIsMenuOpen(false)}>About Us</Link>
          <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3 px-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="block w-full py-3.5 text-center text-white bg-[#12C48B] font-bold text-lg rounded-xl shadow-lg">
                  Open Dashboard
                </Link>
                <button onClick={() => { localStorage.removeItem('token'); window.location.href='/'; }} className="block w-full py-3.5 text-center text-red-500 font-bold text-lg border-2 border-red-100 rounded-xl hover:bg-red-50">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block w-full py-3.5 text-center text-[#4A5560] font-bold text-lg border-2 border-gray-200 rounded-xl hover:bg-gray-50">
                  Login
                </Link>
                <Link to="/signup" className="block w-full py-3.5 text-center text-white bg-[#12C48B] font-bold text-lg rounded-xl shadow-lg">
                  Sign Up Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
