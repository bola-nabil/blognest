import React, { useState, useEffect } from 'react';
import Container from '@/components/Container';
import { api } from '@/api';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faComment,
  faTrash,
  faEdit,
  faSave,
  faTimes,
  faBookmark,
} from '@fortawesome/free-solid-svg-icons';
import BlogDetailsSkeleton from '@/components/Loading/BlogDetailsSkeleton';
import { useUserAuth } from '@/hooks/useUserAuth';

const BlogDetails = () => {
  const { id } = useParams();
  const currentUserId = JSON.parse(localStorage.getItem('user'))?.id;

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [profile, setProfile] = useState(null);
  const { user } = useUserAuth();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.get(`/v1/blogs/${id}`);
        const blogData = response.data.blog;
        setBlog({
          ...blogData,
          likes_count: blogData.likes_count || 0,
          comments_count: blogData.comments_count || 0,
          liked: blogData.liked || false,
          tags: blogData.tags || [],
        });

        const commentsRes = await api.get(`/v1/blogs/${id}/comments`);
        setComments(
          commentsRes.data.comment.map((c) => ({
            id: c.id,
            content: c.comment,
            user: c.user || { name: 'Anonymous', id: null },
            user_id: c.user_id,
          }))
        );

        const bookmarksRes = await api.get('/v1/user/bookmarks');
        const bookmarks = Array.isArray(bookmarksRes.data.bookmarks)
          ? bookmarksRes.data.bookmarks
          : bookmarksRes.data.data || [];

        setIsBookmarked(bookmarks.some((b) => b.id === blogData.id));
      } catch (err) {
        console.error('Error fetching blog or comments =>', err);
      }
    };

    fetchBlog();
  }, [id]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!blog?.user?.id) return;
      try {
        const res = await api.get(`/v1/users/${blog.user.id}/profile`);
        setProfile(res.data.user);
        if (res.data.user?.is_following !== undefined) {
          setIsFollowing(res.data.user.is_following);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, [blog?.user?.id]);

  const handleToggleLike = async () => {
    try {
      const res = await api.post(`/v1/blogs/${id}/like`);
      const data = res.data.data;

      setBlog((prev) => ({
        ...prev,
        liked: data.liked,
        likes_count: data.likes_count,
      }));
    } catch (err) {
      console.error('Error toggling like', err);
    }
  };

  const handleToggleBookmark = async () => {
    try {
      await api.post(`/v1/blogs/${id}/bookmarks`);
      setIsBookmarked((prev) => !prev);
    } catch (err) {
      console.error('Error toggling bookmark', err);
    }
  };

  const handleFollowToggle = async () => {
    if (!blog?.user?.id) return;
    try {
      setProcessing(true);
      if (isFollowing) {
        await api.delete(`/v1/users/${blog.user.id}/unfollow`);
        setIsFollowing(false);
      } else {
        await api.post(`/v1/users/${blog.user.id}/follow`);
        setIsFollowing(true);
      }
    } catch (err) {
      console.error('Error following/unfollowing:', err);
    } finally {
      setProcessing(false);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      const res = await api.post(`/v1/blogs/${id}/comments`, {
        comment: commentText,
      });
      const newComment = {
        id: res.data.comment.id,
        content: res.data.comment.comment,
        user: { name: 'You', id: currentUserId },
        user_id: currentUserId,
      };
      setComments((prev) => [...prev, newComment]);
      setBlog((prev) => ({
        ...prev,
        comments_count: (prev.comments_count || 0) + 1,
      }));
      setCommentText('');
    } catch (err) {
      console.error('Error adding comment', err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?'))
      return;
    try {
      await api.delete(`/v1/comments/${commentId}`);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      setBlog((prev) => ({
        ...prev,
        comments_count: (prev.comments_count || 0) - 1,
      }));
    } catch (err) {
      console.error('Error deleting comment', err);
    }
  };

  const startEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditingText(comment.content);
  };

  const cancelEdit = () => {
    setEditingCommentId(null);
    setEditingText('');
  };

  const saveEditComment = async (commentId) => {
    if (!editingText.trim()) return;
    try {
      const res = await api.put(`/v1/comments/${commentId}`, {
        comment: editingText,
      });
      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId ? { ...c, content: res.data.comment.comment } : c
        )
      );
      cancelEdit();
    } catch (err) {
      console.error('Error updating comment', err);
    }
  };

  if (!blog) return <BlogDetailsSkeleton />;

  const isMyProfile = user?.id === Number(blog.user.id);

  return (
    <Container>
      <div className="max-w-3xl mx-auto py-6 transition-colors duration-300 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-xl shadow-sm">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-80 object-cover rounded-xl"
        />

        <h1 className="text-3xl font-bold mt-4">{blog.title}</h1>

        {/* FIXED SECTION */}
        <div className="text-gray-500 dark:text-gray-400 text-sm flex items-center justify-between">
          <span>
            By {blog.user.name} •{' '}
            {new Date(blog.created_at).toLocaleDateString()}
          </span>

          <div className="flex items-center gap-3">
            {isMyProfile ? (
              <Link
                to={`/profile/${blog.user.id}`}
                className="text-white bg-blue-700 rounded-md p-2"
              >
                View Profile
              </Link>
            ) : (
              <button
                disabled={processing}
                onClick={handleFollowToggle}
                className={`ml-4 px-3 py-1 rounded-lg text-sm transition-colors ${
                  isFollowing
                    ? 'bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {blog.tags.map((tag) => (
            <Link to={`/tag/${tag.id}`} key={tag.id}>
              <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 px-3 py-1 text-sm rounded-full">
                #{tag.name}
              </span>
            </Link>
          ))}
        </div>

        <div
          className="prose dark:prose-invert max-w-none mt-6 text-gray-700 dark:text-gray-200"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <div className="flex justify-between items-center mt-6 border-t pt-4 border-gray-200 dark:border-gray-700">
          <button
            onClick={handleToggleLike}
            className={`flex items-center gap-2 ${
              blog.liked
                ? 'text-red-500'
                : 'text-gray-600 dark:text-gray-300 hover:text-red-400'
            }`}
          >
            <FontAwesomeIcon icon={faHeart} />
            <span>{blog.likes_count}</span>
          </button>

          <button
            onClick={handleToggleBookmark}
            className={`flex items-center gap-2 ${
              isBookmarked
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            <FontAwesomeIcon icon={faBookmark} />
            <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>

          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <FontAwesomeIcon icon={faComment} />
            <span>{blog.comments_count}</span>
          </div>
        </div>

        {/* 💬 Comment Input */}
        <div className="mt-6">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="w-full border rounded-lg p-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />
          <button
            onClick={handleAddComment}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Add Comment
          </button>
        </div>

        {/* 🗨️ Comments */}
        <div className="mt-6">
          <h3 className="font-bold text-lg mb-4">Comments</h3>
          {comments.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No comments yet.</p>
          ) : (
            <div className="space-y-4">
              {comments.map((c) => (
                <div
                  key={c.id}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 relative"
                >
                  <p className="font-semibold text-gray-700 dark:text-gray-100">
                    {c.user?.name}
                  </p>

                  {editingCommentId === c.id ? (
                    <>
                      <textarea
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="w-full border rounded-lg p-2 mt-1 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100"
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => saveEditComment(c.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center gap-1"
                        >
                          <FontAwesomeIcon icon={faSave} /> Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 flex items-center gap-1"
                        >
                          <FontAwesomeIcon icon={faTimes} /> Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      {c.content}
                    </p>
                  )}

                  {c.user_id === currentUserId && editingCommentId !== c.id && (
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        onClick={() => startEditComment(c)}
                        className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
                        title="Edit"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDeleteComment(c.id)}
                        className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                        title="Delete"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default BlogDetails;
