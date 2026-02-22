import React, { useState, useEffect } from 'react';
import { useUserAuth } from '@/hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import { api } from '@/api';
import LoadingButton from '@/components/Loading/LoadingButton';

const ProfileUpdate = () => {
  const { user, setUser, loading: userLoading } = useUserAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    location: user?.location || '',
    website: user?.website || '',
    bio: user?.bio || '',
  });
  const [imagePreview, setImagePreview] = useState(user?.profile_image || null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        location: user.location || '',
        website: user.website || '',
        bio: user.bio || '',
      });
      setImagePreview(user.profile_image || null);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value && value.trim() !== '') form.append(key, value);
      });
      if (imageFile) form.append('profile_image', imageFile);

      const res = await api.post('/v1/profile/update', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data?.user) {
        setUser(res.data.user);
      }
      navigate(`/profile/${user.id}`);
    } catch (err) {
      console.error("Can't update profile:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : '?');

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 pb-10 px-4 transition-colors duration-300">
      {userLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 dark:bg-black/70 backdrop-blur-sm z-50">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-blue-600 dark:text-blue-300 font-semibold">
            Updating your profile...
          </p>
        </div>
      )}

      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 transition-colors duration-300">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Update Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col items-center">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold text-3xl border-2 border-blue-500">
                {getInitial(user?.name)}
              </div>
            )}
            <label
              htmlFor="profile_image"
              className="mt-3 text-sm text-blue-600 dark:text-blue-400 cursor-pointer hover:underline"
            >
              Change Image
            </label>
            <input
              type="file"
              id="profile_image"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
              placeholder="Your location"
            />
          </div>

          <div>
            <label
              htmlFor="website"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
              placeholder="Tell something about yourself..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-70"
          >
            {loading ? <LoadingButton /> : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
