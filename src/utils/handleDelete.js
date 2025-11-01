import { api } from '@/api';

export const handleDeleteBlog = async (blogId) => {
  try {
    await api.delete(`/v1/blogs/${blogId}`);
    window.location.reload();
  } catch (err) {
    console.error('Error deleting blog:', err);
  }
};

export const handleRemoveBookmark = async (bookmark) => {
  try {
    await api.post(`/v1/blogs/${bookmark.pivot.blog_id}/bookmarks`);
    window.location.reload();
  } catch (err) {
    console.error('Error removing bookmark:', err);
  }
};
