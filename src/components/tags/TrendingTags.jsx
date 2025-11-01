import React from 'react';
import { useTrendingTags } from '@/hooks/useTrendingTags';
import { Link } from 'react-router-dom';

const TrendingTags = () => {
  const { tags, loading } = useTrendingTags();

  if (loading) {
    return (
      <div className="flex flex-wrap gap-2">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-8 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-full"
          ></div>
        ))}
      </div>
    );
  }

  if (!tags.length) {
    return (
      <p className="text-sm text-gray-500 italic">
        No trending tags available yet.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          to={`/tag/${tag.id}`}
          key={tag.id}
          className="text-sm font-medium px-3 py-1 rounded-full border border-blue-100 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200"
        >
          #{tag.name}
        </Link>
      ))}
    </div>
  );
};

export default TrendingTags;
