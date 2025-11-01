import React, { useState } from 'react';
import { useBookmarks } from '@/hooks/useBookmarks';
import { api } from '@/api';
import { MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoadingSkeleton from '@/components/Loading/LoadingSkeleton'; // 👈 make sure this path is correct

const BookmarksContent = () => {
  const { bookmarks, setBookmarks, loading } = useBookmarks();
  const [menuOpen, setMenuOpen] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const handleToggle = async (blogId) => {
    try {
      await api.post(`/v1/blogs/${blogId}/bookmarks`);
      setBookmarks((prev) => prev.filter((b) => b.id !== blogId));
      setMenuOpen(null);
    } catch (err) {
      console.error("Can't toggle bookmark", err);
    }
  };

  const handleShowMore = () => setVisibleCount((prev) => prev + 6);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center py-12 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Your Bookmarks
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-base md:text-lg opacity-90 leading-relaxed">
            All your saved blogs — collected here for easy access and
            inspiration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 space-y-4"
            >
              <LoadingSkeleton height="h-48" />
              <LoadingSkeleton height="h-5 w-3/4" />
              <LoadingSkeleton height="h-4 w-full" />
              <LoadingSkeleton height="h-4 w-5/6" />
              <div className="flex justify-between items-center">
                <LoadingSkeleton height="h-4 w-24" />
                <LoadingSkeleton height="h-6 w-6 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-gray-600 dark:text-gray-400 text-lg font-medium">
          No bookmarks yet.
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Start exploring and save your favorite posts!
        </p>
      </div>
    );
  }

  const visibleBookmarks = bookmarks.slice(0, visibleCount);
  const allShown = visibleCount >= bookmarks.length;

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center py-12 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Your Bookmarks
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-base md:text-lg opacity-90 leading-relaxed">
          All your saved blogs — collected here for easy access and inspiration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleBookmarks.map((blog) => (
          <div
            key={blog.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col"
          >
            <Link to={`/blogs/${blog.id}`}>
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-xl"
              />
            </Link>

            <Link to={`/blogs/${blog.id}`}>
              <div className="mt-4 flex-1">
                <h2 className="font-bold text-lg text-gray-800 dark:text-gray-100 line-clamp-2">
                  {blog.title}
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                  {blog.content?.replace(/<[^>]+>/g, '').slice(0, 100)}...
                </p>
              </div>
            </Link>

            <div className="mt-3 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 relative">
              <span>{new Date(blog.created_at).toLocaleDateString()}</span>

              <div className="relative">
                <button
                  onClick={() =>
                    setMenuOpen(menuOpen === blog.id ? null : blog.id)
                  }
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <MoreVertical
                    size={18}
                    className="text-gray-600 dark:text-gray-300"
                  />
                </button>

                {menuOpen === blog.id && (
                  <div className="absolute bottom-8 right-0 w-40 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-10">
                    <button
                      onClick={() => handleToggle(blog.id)}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {!allShown && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleShowMore}
            className="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default BookmarksContent;
