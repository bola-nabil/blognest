import React, { useState } from 'react';
import { api } from '@/api';
import LoadingButton from '@/components/Loading/LoadingButton';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.post('/login', formData);

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.user.id);
        window.location.href = '/home';
      }
    } catch (err) {
      setError(err.response?.data?.message || 'something wrong');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-700">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full">
        {/* Left Section */}
        <div className="md:w-1/2 flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 text-white p-10">
          <div className="text-center">
            <div className="bg-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold text-xl">🚀</span>
            </div>
            <h2 className="text-2xl font-bold">Welcome Back to BlogNest</h2>
            <p className="mt-2 text-sm opacity-80">
              Login to continue exploring blogs and sharing your thoughts.
            </p>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="md:w-1/2 p-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Sign in to your account
          </h2>
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-mail Address"
                className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2"
              />
            </div>
            <button
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-xl shadow-lg hover:opacity-90 transition"
              disabled={loading}
              type="submit"
            >
              {loading ? <LoadingButton /> : 'Login'}
            </button>

            <p className="text-center text-sm text-gray-600">
              Don’t have an account?{' '}
              <a
                href="/register"
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
