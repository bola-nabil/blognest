import { useState, useEffect, useCallback } from 'react';
import { api } from '@/api';
import { useNavigate } from 'react-router-dom';

export const usePaginatedBlogs = (
  endpoint,
  initialPage = 1,
  appendMode = false
) => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchBlogs = useCallback(
    async (currentPage = page) => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`${endpoint}?page=${currentPage}`);

        const key = Object.keys(response.data).find(
          (k) => response.data[k]?.data
        );

        const newBlogs = response.data[key].data || [];
        setLastPage(response.data[key].last_page);

        setBlogs((prev) =>
          appendMode && currentPage > 1 ? [...prev, ...newBlogs] : newBlogs
        );
      } catch (err) {
        console.error(`Can't fetch blogs from ${endpoint}`, err);
        setError(err.response?.data?.message || 'Failed to load blogs.');
        navigate('/server-faild');
      } finally {
        setLoading(false);
      }
    },
    [endpoint, page, appendMode, navigate]
  );

  useEffect(() => {
    fetchBlogs();
  }, [endpoint, page, fetchBlogs]);

  const loadMore = () => {
    if (page < lastPage) setPage((prev) => prev + 1);
  };

  const refreshBlogs = () => {
    setPage(1);
    fetchBlogs(1);
  };

  return {
    blogs,
    setBlogs,
    page,
    lastPage,
    loading,
    error,
    setPage,
    loadMore,
    refreshBlogs,
  };
};
