import React from 'react'

const UpdateBlogContent = ({children, initialLoading}) => {
    if (initialLoading)
        return (
        <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-700 dark:text-gray-200 font-medium">
                Loading blog data...
            </p>
            </div>
        </div>
        );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-10 px-4">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-3xl p-8 transition">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">
            ✏️ Update Blog
            </h1>
            {children}
        </div>
    </div>
  )
}

export default UpdateBlogContent;