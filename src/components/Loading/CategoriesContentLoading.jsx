import React from 'react';
import LoadingSkeleton from './LoadingSkeleton';

const CategoriesContentLoading = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <LoadingSkeleton height="h-6 w-3/4" />
          </div>
        ))}
    </div>
  )
}

export default CategoriesContentLoading