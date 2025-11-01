import React, { useState, useEffect } from 'react';
import { api } from '@/api';
import { useUserAuth } from './useUserAuth';
import { useNavigate } from 'react-router-dom';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await api.get('/v1/users');
        setUsers(response.data.users.filter((u) => u.id !== user?.id));
      } catch (err) {
        console.error("Can't fetching users data", err);
        navigate('/serverfaild');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user, navigate]);

  return { users, loading };
};
