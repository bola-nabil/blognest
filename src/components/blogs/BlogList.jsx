import React from 'react';
import BlogCard from './BlogCard';
import { sortedBlogs } from '@/utils/sorting';

const BlogList = ({ blogs, onToggleBookmark }) => {
  if (!blogs?.length) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
        No blogs found.
      </p>
    );
  }

  const sorted = sortedBlogs({ blogs });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sorted.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          handleToggleBookmark={onToggleBookmark}
        />
      ))}
    </div>
  );
};

export default BlogList;
