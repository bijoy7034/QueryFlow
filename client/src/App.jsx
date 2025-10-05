import React, { useState } from 'react';
import { Camera, Package, Lock, Activity, FileText, Clock, MessageSquare, Shield, Send, Database } from 'lucide-react';
import LoginPage from './components/Login/Login';
import Dashboard from './pages/Dashboard';



export default function App() {
  const [page, setPage] = useState('login');
  const [user, setUser] = useState(null);

  const handleLogin = (credentials) => {
    setUser({ email: credentials.email });
    setPage('dashboard');
  };

  const handleRegister = (userData) => {
    setUser({ name: userData.name, email: userData.email });
    setPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setPage('login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {page === 'login' && (
        <LoginPage
          onLogin={handleLogin}
          onSwitchToRegister={() => setPage('register')}
        />
      )}
      {page === 'register' && (
        <RegisterPage
          onRegister={handleRegister}
          onSwitchToLogin={() => setPage('login')}
        />
      )}
      {page === 'dashboard' && user && (
        <Dashboard onLogout={handleLogout} />
      )}
    </div>
  );
}