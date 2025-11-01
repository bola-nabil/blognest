import React, { useState, useEffect } from 'react';
import { api } from '@/api';
import { useNavigate } from 'react-router-dom';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await api.get('v1/user/bookmarks');
        setBookmarks(response.data.bookmarks.data);
      } catch (err) {
        console.error("Can't fetching bookmarks data", err);
        setError(err);
        navigate('/server-faild');
      } finally {
        setLoading(false);
      }
    };
    fetchBookmarks();
  }, [navigate]);
  return { bookmarks, setBookmarks, loading, error };
};
