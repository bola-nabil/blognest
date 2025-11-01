import { useState, useEffect } from 'react';
import { api } from '@/api';
import { useNavigate } from 'react-router-dom';

export const useCategoryTag = (endPoint, id) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respone = await api.get(`/v1/${endPoint}/${id}`);
        setData(respone.data.category || respone.data.tag);
      } catch (err) {
        console.error(`Can't fetch ${endPoint} data`, err);
        setError(err);
        navigate('/server-faild');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endPoint, id, navigate]);

  return { data, setData, loading, error };
};
