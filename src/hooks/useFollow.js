import React, { useState } from 'react';
import { api } from '@/api';
import { useNavigate } from 'react-router-dom';

export const useFollow = (initialIsFollowing = false) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleFollow = async (userId) => {
    setLoading(true);
    try {
      if (isFollowing) {
        await api.delete(`v1/users/${userId}/unfollow`);
        setIsFollowing(false);
      } else {
        await api.post(`v1/users/${userId}/follow`);
        setIsFollowing(true);
      }
    } catch (err) {
      console.error('Follow error:', err.response?.data || err.message);
      navigate('/server-faild');
    } finally {
      setLoading(false);
    }
  };

  return { isFollowing, toggleFollow, setIsFollowing, loading };
};
