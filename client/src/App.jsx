import React from 'react'
import { BrowserRouter as Router , Routes, Route, Navigate, Outlet } from 'react-router-dom'
import LandingPage from './pages/Landing/LandingPage'
import SignUp from './pages/Auth/SignUp'
import Login from './pages/Auth/Login'
import ForgotPassword from './pages/Auth/ForgotPassword'
import ResetPassword from './pages/Auth/ResetPassword'
import Features from './pages/Landing/Features'
import Pricing from './pages/Landing/Pricing'
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import Investment from './pages/Dashboard/Investment';
import Marketing from './pages/Dashboard/Marketing';
import Budget from './pages/Dashboard/Budget';
import Subscriptions from './pages/Dashboard/Subscriptions';
import Receivables from './pages/Dashboard/Receivables';
import About from './pages/Landing/About';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp />} />
          <Route path="/forgot-password" exact element={<ForgotPassword />} />
          <Route path="/resetpassword/:token" exact element={<ResetPassword />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" exact element={<Home />} />
            <Route path="/income" exact element={<Income />} />
            <Route path="/expense" exact element={<Expense />} />
            <Route path="/investment" exact element={<Investment />} />
            <Route path="/marketing" exact element={<Marketing />} />
            <Route path="/budget" exact element={<Budget />} />
            <Route path="/subscriptions" exact element={<Subscriptions />} />
            <Route path="/receivables" exact element={<Receivables />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App

const ProtectedRoute = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}