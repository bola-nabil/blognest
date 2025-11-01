import React, { useState } from 'react';
import Container from '../Container';
import { useCategoryTag } from '@/hooks/useCategoryTag';
import { useParams } from 'react-router-dom';
import MetaCard from '../cards/MetaCard';

const CategoryShow = () => {
  const { id } = useParams();
  const { data: category, loading } = useCategoryTag('categories', id);
  const [visibleCount, setVisibleCount] = useState(6);

  if (loading) {
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
    );
  }

  const blogs = category?.blogs || [];
  const visibleBlogs = blogs.slice(0, visibleCount);

  return (
    <Container>
      <div className="category">
        <div className="text-center py-12 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {category?.name}
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-base md:text-lg opacity-90 leading-relaxed">
            Discover blogs you’ll love — organized by topics that inspire you.
          </p>
        </div>

        <div>
          {blogs.length > 0 ? (
            <>
              <MetaCard blogs={visibleBlogs} />
              
              {visibleCount < blogs.length && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                  >
                    See More
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-gray-500 py-10">
              No blogs available in this category yet.
            </p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default CategoryShow;
