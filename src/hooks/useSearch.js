import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '@/api';

export const useSearch = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('query') || '';

  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({
    blogs: [],
    categories: [],
    tags: [],
  });

  useEffect(() => {
    const fetchResults = async () => {
      if (!initialQuery) return;

      setLoading(true);
      try {
        const res = await api.get(`/v1/search?query=${initialQuery}`);
        setResults({
          blogs: res.data.blogs || [],
          categories: res.data.categories || [],
          tags: res.data.tags || [],
        });
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [initialQuery]);

  return { results, query, setQuery, initialQuery, loading };
};
