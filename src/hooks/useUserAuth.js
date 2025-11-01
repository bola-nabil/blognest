import React, { useState, useEffect } from 'react';
import { api } from '@/api';
import { useNavigate } from 'react-router-dom';

export const useUserAuth = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/v1/profile/`);
        setUser(response.data.user);
      } catch (err) {
        console.error("Can't fetching user data", err);
        navigate('/server-faild');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  return { user, setUser, loading };
};
