import React, { useState, useEffect } from 'react';
import { api } from '@/api';
import { useNavigate } from 'react-router-dom';

export const useFeed = (page) => {
  const [feeds, setFeeds] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const response = await api.get('/v1/feed');
        setFeeds(response.data.feed.data);
        setLastPage(response.data.feed.last_page);
      } catch (err) {
        console.error("Can't fetching feed data", err);
        navigate('/server-faild');
      }
    };
    fetchFeeds();
  }, [page, navigate]);

  return { feeds, setFeeds, lastPage };
};
