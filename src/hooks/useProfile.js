import React, { useState, useEffect } from 'react';
import { api } from '@/api';
import { useNavigate } from 'react-router-dom';

export const useProfile = (id) => {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await api.get(`/v1/users/${id}/profile`);
        setProfile(response.data.user);
      } catch (err) {
        console.error("Can't fetching profile data", err);
        navigate('/server-faild');
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, [id, navigate]);

  return { profile, loading };
};
