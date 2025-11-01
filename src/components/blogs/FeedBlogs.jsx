import React from "react";
import { usePaginatedBlogs } from "@/hooks/usePaginatedBlogs";
import { useToggleBookmark } from "@/hooks/useToggleBookmark";
import BlogList from "./BlogList";
import BlogSkeleton from "../Loading/BlogSkeleton";

const LoadMoreButton = ({ onClick, disabled }) => (
  <div className="flex justify-center mt-8">
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 transition-all duration-200"
    >
      {disabled ? "Loading..." : "Show More"}
    </button>
  </div>
);

const FeedBlogs = () => {
  const {
    blogs: feeds = [],
    setBlogs: setFeeds,
    lastPage = 1,
    loading = false,
    page = 1,
    loadMore,
  } = usePaginatedBlogs("/v1/feed", 1, true);

  const { handleToggleBookmark } = useToggleBookmark(setFeeds);

  // Handle empty and loading states
  if (feeds.length === 0) {
    if (loading) {
      return (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <BlogSkeleton key={i} />
          ))}
        </div>
      );
    }

    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500 text-lg">No blogs in your feed yet.</p>
      </div>
    );
  }

  return (
    <div
      className="max-w-6xl mx-auto"
      aria-live="polite"
      aria-busy={loading ? "true" : "false"}
    >
      <BlogList blogs={feeds} onToggleBookmark={handleToggleBookmark} />

      {loading && feeds.length > 0 && (
        <div
          className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse"
          aria-busy="true"
        >
          {[...Array(3)].map((_, i) => (
            <BlogSkeleton key={i} />
          ))}
        </div>
      )}

      {!loading && page < lastPage && (
        <LoadMoreButton onClick={loadMore} disabled={loading} />
      )}
    </div>
  );
};

export default FeedBlogs;
