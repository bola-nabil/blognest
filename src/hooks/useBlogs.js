import React, { useState, useEffect } from 'react';
import { api } from '@/api';
import { useNavigate } from 'react-router-dom';

export const useBlogs = () => {
  const [blogs, setblogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await api.get('/v1/blogs');
        setblogs(response.data.blogs.data);
      } catch (err) {
        console.error("Can't fetching blogs data", err);
        navigate('/server-faild');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [navigate]);

  return { blogs, loading };
};
