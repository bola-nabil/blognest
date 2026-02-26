import React from 'react';
import { useTrendingTags } from '@/hooks/useTrendingTags';
import { Link } from 'react-router-dom';
import { TrendingTagsLoading } from '@/components/Loading';

const TrendingTags = () => {
  const { tags, loading } = useTrendingTags();

  if (loading) {
    return <TrendingTagsLoading />;
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
