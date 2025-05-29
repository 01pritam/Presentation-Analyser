import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../App';
import { 
  Eye, EyeOff, Mail, Lock, Building, User, 
  CheckCircle, AlertCircle, ArrowRight, Sparkles,
  Shield, Zap, Globe, Star
} from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'interviewer'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Demo users for testing
  const demoUsers = {
    'company@demo.com': { role: 'company', name: 'TechCorp HR', company: 'TechCorp Inc.' },
    'interviewer@demo.com': { role: 'interviewer', name: 'John Candidate', company: null }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const demoUser = demoUsers[formData.email];
      if (demoUser && formData.password === 'demo123') {
        const userData = {
          id: Date.now(),
          email: formData.email,
          name: demoUser.name,
          role: demoUser.role,
          company: demoUser.company
        };

        login(userData);
        
        if (userData.role === 'company') {
          navigate('/dash');
        } else {
          navigate('/apply');
        }
      } else {
        setError('Invalid credentials. Use demo@company.com or demo@interviewer.com with password: demo123');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Fixed Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Main Content Container - Fixed Height and Centered */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 relative group">
            <Lock className="h-8 w-8 text-white relative z-10 transition-transform duration-300 group-hover:scale-110" />
            <Sparkles className="absolute top-1 right-1 h-3 w-3 text-yellow-300 animate-pulse" />
          </div>
          
          <h1 className="text-4xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-2 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-gray-300 text-base">Sign in to your account</p>
        </div>

        {/* Login Form Container */}
        <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-3 flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                Choose Your Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'company'})}
                  className={`px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                    formData.role === 'company'
                      ? 'border-blue-400 bg-blue-500/20 shadow-lg'
                      : 'border-white/20 hover:border-white/40 bg-white/5'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <Building className="h-5 w-5 text-white" />
                    <span className="text-white font-medium text-sm">Company</span>
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'interviewer'})}
                  className={`px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                    formData.role === 'interviewer'
                      ? 'border-purple-400 bg-purple-500/20 shadow-lg'
                      : 'border-white/20 hover:border-white/40 bg-white/5'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <User className="h-5 w-5 text-white" />
                    <span className="text-white font-medium text-sm">Candidate</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-white/90 mb-2 flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 text-white placeholder-white/50 transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-white/90 mb-2 flex items-center">
                <Lock className="h-4 w-4 mr-2" />
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 text-white placeholder-white/50 transition-all duration-300"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-all duration-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center p-3 bg-red-500/20 backdrop-blur-xl border border-red-400/30 rounded-xl">
                <AlertCircle className="h-4 w-4 text-red-400 mr-2 flex-shrink-0" />
                <span className="text-red-200 text-sm">{error}</span>
              </div>
            )}

            {/* Demo Credentials */}
            <div className="bg-cyan-500/10 backdrop-blur-xl border border-cyan-400/30 rounded-xl p-3">
              <div className="flex items-center mb-2">
                <Zap className="h-4 w-4 text-cyan-400 mr-2" />
                <h4 className="font-semibold text-cyan-300 text-sm">Demo Credentials</h4>
              </div>
              <div className="text-xs text-cyan-200 space-y-1">
                <div>Company: company@demo.com / demo123</div>
                <div>Candidate: interviewer@demo.com / demo123</div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 ${
                loading
                  ? 'bg-gray-600/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 shadow-lg hover:shadow-xl hover:scale-105'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </div>
            </button>

            {/* Forgot Password */}
            <div className="text-center">
              <Link 
                to="/forgot-password" 
                className="text-blue-300 hover:text-blue-200 text-sm transition-all duration-300 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 pt-4 border-t border-white/20 text-center">
            <p className="text-white/70 mb-2 text-sm">
              Don't have an account?
            </p>
            <Link 
              to="/signup" 
              className="inline-flex items-center space-x-2 text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-semibold hover:from-blue-300 hover:to-purple-300 transition-all duration-300"
            >
              <span>Create Account</span>
              <Star className="h-4 w-4 text-purple-400" />
            </Link>
          </div>
        </div>

        {/* Bottom Badge */}
        <div className="text-center mt-6">
          <div className="inline-flex items-center space-x-2 px-3 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10">
            <Globe className="h-3 w-3 text-cyan-400" />
            <span className="text-white/70 text-xs">Secured by AI Technology</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
