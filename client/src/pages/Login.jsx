import { Package, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import useAuthStore from "../store/auth";
import usePageStore from "../store/page";

const LoginPage = () => {
  const { loading, error, login, is_logged_in } = useAuthStore();
  const {page, setPage} = usePageStore()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async() => {
    if (username && password) {
      await login({ username, password });
      if (is_logged_in) {
        setPage('dashboard');
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && username && password && !loading) {
      handleLogin();
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
  
            {error && (
              <div className="mb-5 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3 animate-in slide-in-from-top">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-red-300 font-medium">Login Failed</p>
                  <p className="text-xs text-red-400/80 mt-1">
                    {typeof error === 'string' ? error : 'Invalid credentials. Please try again.'}
                  </p>
                </div>
              </div>
            )}

            <div className="mb-5">
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
                className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="you@example.com"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
                className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="••••••••"
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={loading || !username || !password}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-medium hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </div>

          <div className="mt-6 text-center text-sm">
            <span className="text-white/70">Don't have an account? </span>
            <button
              onClick={()=>{ setPage('register')}}
              disabled={loading}
              className="text-blue-400 hover:text-blue-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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