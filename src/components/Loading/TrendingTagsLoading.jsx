import React from 'react'

const TrendingTagsLoading = () => {
  return (
    <div className="flex flex-wrap gap-2">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-8 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-full"
          ></div>
        ))}
      </div>
  )
}

export default TrendingTagsLoading;