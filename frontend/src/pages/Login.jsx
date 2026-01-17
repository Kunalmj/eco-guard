import React, { useState } from 'react';
import { Leaf, Mail, Lock, User, Shield, CheckCircle, AlertCircle } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('user'); // 'user' or 'official'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    officialId: '',
    department: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate government email
  const isValidGovEmail = (email) => {
    const govDomains = [
      '@gov.in',
      '@nic.in',
      '@mygov.in',
      '@india.gov.in',
      '@forest.gov.in',
      '@moef.gov.in'
    ];
    return govDomains.some(domain => email.toLowerCase().endsWith(domain));
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    } else if (userType === 'official' && !isValidGovEmail(formData.email)) {
      newErrors.email = 'Please use a valid government email (@gov.in, @nic.in, etc.)';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!isLogin && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!isLogin && userType === 'official') {
      if (!formData.officialId.trim()) {
        newErrors.officialId = 'Official ID is required';
      }
      if (!formData.department.trim()) {
        newErrors.department = 'Department is required';
      }
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // Store user data in memory (in real app, this would be handled by backend)
      const userData = {
        name: formData.name,
        email: formData.email,
        userType: userType,
        isAuthenticated: true,
        ...(userType === 'official' && {
          officialId: formData.officialId,
          department: formData.department,
          verified: true
        })
      };

      // Store in memory
      localStorage.setItem("user", JSON.stringify(userData));
      
      // Redirect to home page
      alert(`${isLogin ? 'Login' : 'Signup'} successful! Redirecting to dashboard...`);
      window.location.href = '/';
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 flex items-center justify-center p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="w-10 h-10 text-green-400" />
            <span className="text-3xl font-bold text-white">EcoGuard AI</span>
          </div>
          <p className="text-gray-400">Secure access to land pollution monitoring</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl border border-green-500/30 rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left Side - User Type Selection */}
            <div className="bg-gradient-to-br from-green-900/40 to-blue-900/40 p-8 md:p-12">
              <h2 className="text-2xl font-bold text-white mb-6">Select Account Type</h2>
              
              {/* User Type Toggle */}
              <div className="space-y-4 mb-8">
                {/* Normal User */}
                <button
                  onClick={() => setUserType('user')}
                  className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                    userType === 'user'
                      ? 'border-green-500 bg-green-500/20'
                      : 'border-gray-600 bg-gray-800/30 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      userType === 'user' ? 'bg-green-500/30' : 'bg-gray-700'
                    }`}>
                      <User className="w-6 h-6 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">Citizen User</h3>
                      <p className="text-sm text-gray-400">
                        Report pollution, upload images, and track issues in your area
                      </p>
                    </div>
                    {userType === 'user' && (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    )}
                  </div>
                </button>

                {/* Government Official */}
                <button
                  onClick={() => setUserType('official')}
                  className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                    userType === 'official'
                      ? 'border-blue-500 bg-blue-500/20'
                      : 'border-gray-600 bg-gray-800/30 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      userType === 'official' ? 'bg-blue-500/30' : 'bg-gray-700'
                    }`}>
                      <Shield className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">Government Official</h3>
                      <p className="text-sm text-gray-400">
                        Access verified reports, manage alerts, and coordinate responses
                      </p>
                    </div>
                    {userType === 'official' && (
                      <CheckCircle className="w-6 h-6 text-blue-400" />
                    )}
                  </div>
                </button>
              </div>

              {/* Benefits */}
              <div className="bg-gray-900/50 rounded-2xl p-6">
                <h4 className="text-white font-semibold mb-4">
                  {userType === 'user' ? 'User Benefits' : 'Official Features'}
                </h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  {userType === 'user' ? (
                    <>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Upload pollution images</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Track report status</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Real-time notifications</li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-400 mr-2" /> Priority access to reports</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-400 mr-2" /> Advanced analytics dashboard</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-400 mr-2" /> Inter-department collaboration</li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="p-8 md:p-12">
              {/* Login/Signup Toggle */}
              <div className="flex bg-gray-700/50 rounded-xl p-1 mb-8">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 rounded-lg font-semibold transition ${
                    isLogin ? 'bg-green-500 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 rounded-lg font-semibold transition ${
                    !isLogin ? 'bg-green-500 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <div className="space-y-5">
                {/* Name (Signup only) */}
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full bg-gray-700/50 border ${
                          errors.name ? 'border-red-500' : 'border-gray-600'
                        } rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-green-500 transition`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" /> {errors.name}
                      </p>
                    )}
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Email Address
                    {userType === 'official' && (
                      <span className="text-blue-400 text-xs ml-2">(Government email required)</span>
                    )}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-gray-700/50 border ${
                        errors.email ? 'border-red-500' : 'border-gray-600'
                      } rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-green-500 transition`}
                      placeholder={userType === 'official' ? 'your.name@gov.in' : 'your.email@example.com'}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Official ID (Officials only, Signup) */}
                {!isLogin && userType === 'official' && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Official ID / Employee ID
                      </label>
                      <input
                        type="text"
                        name="officialId"
                        value={formData.officialId}
                        onChange={handleChange}
                        className={`w-full bg-gray-700/50 border ${
                          errors.officialId ? 'border-red-500' : 'border-gray-600'
                        } rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition`}
                        placeholder="e.g., GOV123456"
                      />
                      {errors.officialId && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" /> {errors.officialId}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Department
                      </label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className={`w-full bg-gray-700/50 border ${
                          errors.department ? 'border-red-500' : 'border-gray-600'
                        } rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition`}
                      >
                        <option value="">Select Department</option>
                        <option value="forest">Forest Department</option>
                        <option value="pollution">Pollution Control Board</option>
                        <option value="environment">Environment Ministry</option>
                        <option value="municipal">Municipal Corporation</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.department && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" /> {errors.department}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full bg-gray-700/50 border ${
                        errors.password ? 'border-red-500' : 'border-gray-600'
                      } rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-green-500 transition`}
                      placeholder="Enter your password"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" /> {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password (Signup only) */}
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full bg-gray-700/50 border ${
                          errors.confirmPassword ? 'border-red-500' : 'border-gray-600'
                        } rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-green-500 transition`}
                        placeholder="Confirm your password"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" /> {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-bold text-white transition-all transform hover:scale-105 ${
                    userType === 'official'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30'
                      : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/30'
                  } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Processing...' : isLogin ? 'Login' : 'Create Account'}
                </button>
              </div>

              {/* Additional Links */}
              {isLogin && (
                <div className="mt-4 text-center">
                  <a href="#" className="text-sm text-green-400 hover:text-green-300">
                    Forgot password?
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <a href="/" className="text-gray-400 hover:text-white transition">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;