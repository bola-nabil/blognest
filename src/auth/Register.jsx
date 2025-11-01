import React, { useState } from 'react';
import { api } from '@/api';
import LoadingButton from '@/components/Loading/LoadingButton';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
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
      const res = await api.post('/register', formData);

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }
      window.location.href = '/login';
    } catch (err) {
      setError(err.response?.data?.message || 'something went wrong');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-700">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Create your account
        </h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="E-mail Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-xl shadow-lg hover:opacity-90 transition"
          >
            {loading ? <LoadingButton /> : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <a
            href="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
