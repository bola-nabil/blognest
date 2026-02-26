import React from 'react';
import Container from '../Container';

const CategoryShowLoading = () => {
  return (
    <Container>
        <div className="animate-pulse">
          <div className="text-center py-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-2xl shadow-lg mb-12">
            <div className="h-8 w-48 bg-gray-300 mx-auto rounded mb-4"></div>
            <div className="h-4 w-72 bg-gray-300 mx-auto rounded"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md overflow-hidden"
              >
                <div className="h-40 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                  <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                  <div className="h-3 w-1/3 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
  )
}

export default CategoryShowLoading