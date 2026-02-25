import React from 'react'

const ProfileLoading = () => {
  return (
    <div className="max-w-2xl mx-auto pb-20">
        <div className="bg-gray-300 dark:bg-gray-700 w-full h-40 rounded-lg animate-pulse"></div>

        <div className="flex justify-center -mt-14">
          <div className="w-28 h-28 rounded-full border-4 border-white dark:border-gray-900 bg-gray-400 dark:bg-gray-600 animate-pulse"></div>
        </div>

        <div className="text-center mt-8 space-y-3">
          <div className="w-40 h-5 bg-gray-300 dark:bg-gray-700 rounded mx-auto animate-pulse"></div>
          <div className="w-60 h-4 bg-gray-200 dark:bg-gray-700 rounded mx-auto animate-pulse"></div>
        </div>

        <div className="flex justify-center gap-6 mt-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center space-y-2">
              <div className="w-10 h-5 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="w-14 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

  )
}

export default ProfileLoading