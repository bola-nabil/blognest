import { api } from '@/api';
import { useNavigate } from 'react-router-dom';

export const useToggleBookmark = (setBlogs) => {
  const navigate = useNavigate();
  const handleToggleBookmark = async (blogId) => {
    try {
      const res = await api.post(`/v1/blogs/${blogId}/bookmarks`);
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === blogId
            ? { ...blog, bookmarked: res.data.message === 'Blog bookmarked' }
            : blog
        )
      );
    } catch (err) {
      console.error('Error toggling bookmark', err);
      navigate('/server-faild');
    }
  };

  return { handleToggleBookmark };
};
