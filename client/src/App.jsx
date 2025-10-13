import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import usePageStore from './store/page';

export default function App() {
  const {page} = usePageStore()
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {page === 'login' && (
        <LoginPage/>
      )}
      {page === 'register' && (
        <RegisterPage/>
      )}
      {page === 'dashboard' && (
        <Dashboard/>
      )}
    </div>
  );
}