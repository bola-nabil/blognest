import React from 'react'

const FollowLoading = () => {
  return (
    <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 border rounded-xl animate-pulse"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full" />
              <div className="space-y-2">
                <div className="w-24 h-3 bg-gray-200 rounded" />
                <div className="w-16 h-3 bg-gray-100 rounded" />
              </div>
            </div>
            <div className="w-20 h-7 bg-gray-200 rounded-full" />
          </div>
        ))}
      </div>

  )
}

export default FollowLoading