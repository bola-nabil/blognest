import React, { useState, useEffect } from 'react';
import { api } from '@/api';
import { useNavigate } from 'react-router-dom';

export const useExplore = (page) => {
  const [explore, setExplore] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExploreData = async () => {
      try {
        const response = await api.get('/v1/explore');
        setExplore(response.data.explore.data);
        setLastPage(response.data.explore.last_page);
      } catch (err) {
        console.error("Can't fetching explore data", err);
        navigate('/server-faild');
      }
    };
    fetchExploreData();
  }, [page, navigate]);
  return { explore, setExplore, lastPage };
};
