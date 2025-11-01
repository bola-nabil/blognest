import React, { useState } from 'react';
import { api } from '@/api';
import LoadingButton from '@/components/Loading/LoadingButton';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [form, setForm] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await api.post('/v1/change-password', form);
      setMessage(res.data.message || 'Password changed successfully.');
      navigate('/');
      setForm({
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
      });
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        'Something went wrong. Please try again.';
      console.error('Error in Submit Change Password', err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-xl mx-auto mt-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-3xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-700 dark:to-blue-600 p-6">
        <h1 className="text-2xl font-bold text-white text-center">
          🔐 Change Password
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        {message && (
          <p className="text-green-600 dark:text-green-400 text-sm text-center font-medium">
            {message}
          </p>
        )}
        {error && (
          <p className="text-red-600 dark:text-red-400 text-sm text-center font-medium">
            {error}
          </p>
        )}

        <div>
          <label
            htmlFor="current_password"
            className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
          >
            Current Password
          </label>
          <input
            type="password"
            name="current_password"
            id="current_password"
            value={form.current_password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="new_password"
            className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
          >
            New Password
          </label>
          <input
            type="password"
            name="new_password"
            id="new_password"
            value={form.new_password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="new_password_confirmation"
            className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            name="new_password_confirmation"
            id="new_password_confirmation"
            value={form.new_password_confirmation}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 shadow-md ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {loading ? <LoadingButton /> : 'Update Password'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
