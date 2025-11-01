import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '@/components/Container';
import { useSearch } from '@/hooks/useSearch';
import SearchSkeleton from '@/components/Loading/SearchSkeleton';

const SearchResults = () => {
  const navigate = useNavigate();
  const { results, query, setQuery, initialQuery, loading } = useSearch();
  const [activeTab, setActiveTab] = useState('blogs');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  const renderContent = () => {
    if (loading) return <SearchSkeleton type={activeTab} />;

    if (activeTab === 'blogs') {
      if (results.blogs.length === 0)
        return (
          <p className="text-center text-gray-600 dark:text-gray-300 py-10">
            No blogs found for <strong>{query}</strong>.
          </p>
        );

      return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.blogs.map((b) => (
            <Link
              key={b.id}
              to={`/blogs/${b.id}`}
              className="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-lg transition-all p-5"
            >
              <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 line-clamp-2">
                {b.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 line-clamp-3">
                {b.content?.replace(/<[^>]+>/g, '').slice(0, 150) ||
                  'No content available.'}
              </p>
              <div className="mt-4 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                <p>{b.user?.name ? `By ${b.user.name}` : 'Unknown author'}</p>
                <p>{new Date(b.created_at).toLocaleDateString()}</p>
              </div>
            </Link>
          ))}
        </div>
      );
    }

    if (activeTab === 'categories') {
      if (results.categories.length === 0)
        return (
          <p className="text-center text-gray-600 dark:text-gray-300 py-10">
            No categories found for <strong>{query}</strong>.
          </p>
        );

      return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.categories.map((c) => (
            <Link
              key={c.id}
              to={`/category/${c.id}`}
              className="block p-5 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <h2 className="font-medium text-gray-800 dark:text-gray-100 text-lg">
                {c.name}
              </h2>
            </Link>
          ))}
        </div>
      );
    }

    if (activeTab === 'tags') {
      if (results.tags.length === 0)
        return (
          <p className="text-center text-gray-600 dark:text-gray-300 py-10">
            No tags found for <strong>{query}</strong>.
          </p>
        );

      return (
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          {results.tags.map((t) => (
            <Link
              key={t.id}
              to={`/tag/${t.id}`}
              className="px-4 py-2 text-sm bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-100 dark:hover:bg-blue-800/40 transition"
            >
              #{t.name}
            </Link>
          ))}
        </div>
      );
    }
  };

  return (
    <Container>
      <div className="max-w-5xl mx-auto pt-20 pb-16 px-4 text-gray-900 dark:text-gray-100">
        <form
          onSubmit={handleSearch}
          className="block sm:hidden mb-4 sticky top-16 bg-white dark:bg-gray-900 z-10 py-2"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>

        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 hidden sm:block">
          Search results for:{' '}
          <span className="text-blue-600 dark:text-blue-400">
            {initialQuery}
          </span>
        </h1>

        <div className="flex justify-center sm:justify-start gap-3 mb-8 border-b border-gray-200 dark:border-gray-700">
          {['blogs', 'categories', 'tags'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 text-sm font-medium capitalize transition ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {renderContent()}
      </div>
    </Container>
  );
};

export default SearchResults;
