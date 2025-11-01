import { useBlogs } from './useBlogs';
import { useMemo } from 'react';

export const useTrendingTags = () => {
  const { blogs, loading } = useBlogs();

  const tags = useMemo(() => {
    if (!blogs?.length) return [];

    const tagCounts = {};

    for (const blog of blogs) {
      for (const tag of blog.tags || []) {
        if (!tag?.id || !tag?.name) continue;
        tagCounts[tag.id] = tagCounts[tag.id]
          ? { ...tag, count: tagCounts[tag.id].count + 1 }
          : { ...tag, count: 1 };
      }
    }

    return Object.values(tagCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [blogs]);

  return { tags, loading };
};
