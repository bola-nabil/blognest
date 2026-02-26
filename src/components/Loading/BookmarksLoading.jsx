import React from 'react';
import LoadingSkeleton from './LoadingSkeleton';

const BookmarksLoading = () => {
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
  )
}

export default BookmarksLoading