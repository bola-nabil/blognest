import React, { useState } from 'react';
import { useCategoryTag } from '@/hooks/useCategoryTag';
import { useParams } from 'react-router-dom';
import MetaCard from '../cards/MetaCard';
import TagShowSkeleton from '../Loading/TagShowSkeleton';

const TagShow = () => {
  const { id } = useParams();
  const { data: tag, loading } = useCategoryTag('tags', id);

  const [visibleCount, setVisibleCount] = useState(6);

  if (loading) return <TagShowSkeleton />;

  const blogs = tag?.blogs || [];
  const visibleBlogs = blogs.slice(0, visibleCount);

  return (
    <div>
      <div className="text-center py-12 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          {tag?.name}
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
            No blogs available under this tag yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default TagShow;
