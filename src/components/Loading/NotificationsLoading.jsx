import React from 'react'

const NotificationsLoading = () => {
  return (
    <div className="animate-pulse space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-40 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-8 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>

        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="p-4 border rounded-xl shadow-sm bg-gray-100 dark:bg-gray-800"
          >
            <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-60 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
  )
}

export default NotificationsLoading