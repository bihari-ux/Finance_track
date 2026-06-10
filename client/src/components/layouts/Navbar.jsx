import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <nav className="bg-white border-b border-gray-100 fixed w-full z-50 top-0 transition-all duration-300">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between h-[60px]">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/image/fantriq.png" alt="Fintriq" className="h-5 w-auto object-contain mix-blend-multiply contrast-[1.2] brightness-[1.1] scale-[1.8] sm:scale-[2] origin-left ml-2" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-[#4A5560] hover:text-[#12C48B] font-semibold text-[15px] transition-colors">Home</Link>
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
          <Link to="/" className="block px-4 py-3 text-[#4A5560] font-bold text-lg hover:bg-gray-50 rounded-xl" onClick={() => setIsMenuOpen(false)}>Home</Link>
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
