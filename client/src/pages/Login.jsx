import { Package } from "lucide-react";
import { useState } from "react";

const LoginPage = ({ onLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      onLogin({ email, password });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome to QueryFlow</h1>
          <p className="text-white/70">Sign in to access your database queries</p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
          <div>
            <div className="mb-5">
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-500 transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-500 transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-medium hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30 transition-all"
            >
              Sign In
            </button>
          </div>

          <div className="mt-6 text-center text-sm">
            <span className="text-white/70">Don't have an account? </span>
            <button
              onClick={onSwitchToRegister}
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;