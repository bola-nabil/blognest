import React, { useMemo } from "react";
import { usePaginatedBlogs } from "@/hooks/usePaginatedBlogs";
import { useToggleBookmark } from "@/hooks/useToggleBookmark";
import BlogList from "../blogs/BlogList";
import BlogSkeleton from "../Loading/BlogSkeleton";

const ExploreBlogs = () => {
  const {
    blogs: explore,
    setBlogs: setExplore,
    lastPage,
    loading,
    page,
    loadMore,
  } = usePaginatedBlogs("/v1/explore", 1, true);

  const { handleToggleBookmark } = useToggleBookmark(setExplore);

  const gridClass =
    "max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

  const skeletonItems = useMemo(() => [...Array(6)], []);
  const smallSkeletonItems = useMemo(() => [...Array(3)], []);

  if (loading && explore.length === 0) {
    return (
      <div className={gridClass}>
        {skeletonItems.map((_, i) => (
          <BlogSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!loading && explore.length === 0) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500 text-lg">No blogs found yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Explore Blogs</h2>

      <div aria-live="polite">
        <BlogList blogs={explore} onToggleBookmark={handleToggleBookmark} />
      </div>

      {loading && explore.length > 0 && (
        <div className={`mt-6 ${gridClass}`}>
          {smallSkeletonItems.map((_, i) => (
            <BlogSkeleton key={i} />
          ))}
        </div>
      )}

      {!loading && page < lastPage && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Loading...
              </>
            ) : (
              "Show More"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ExploreBlogs;
