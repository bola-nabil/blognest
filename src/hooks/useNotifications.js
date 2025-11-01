import React, { useState, useEffect } from 'react';
import { api } from '@/api';
import { useNavigate } from 'react-router-dom';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get('/v1/notifications');
        setNotifications(response.data.notifications);
      } catch (err) {
        console.error("Cant't fetching Notifications data", err);
        navigate('/server-faild');
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, [navigate]);

  return { notifications, setNotifications, loading };
};
