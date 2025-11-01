import { useState, useEffect } from 'react';
import { api } from '@/api';
import { useNavigate } from 'react-router-dom';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/v1/categories');
        setCategories(response.data.categories);
      } catch (err) {
        console.error("Can't fetch categories", err);
        navigate('/server-faild');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [navigate]);

  return { categories, loading };
};
