import React from 'react';
import { Link } from 'react-router-dom';
import { getExcerpt } from '@/utils/getExcerpt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';

const LastBlogsCard = ({ lastBlogs }) => {
  return (
    <div className="space-y-6">
      {lastBlogs.map((blog) => (
        <div
          key={blog.id}
          className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 flex flex-col gap-3 border border-gray-100"
        >
          <div className="flex items-center gap-3">
            {blog?.user?.profile_image ? (
              <Link to={`/profile/${blog?.user?.id}`} aria-label='go to profile'>
                <img
                  src={blog?.user?.profile_image}
                  alt={blog?.user?.name || 'User Profile'}
                  className="w-12 h-12 rounded-full object-cover border"
                />
              </Link>
            ) : (
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-lg">
                {blog.user.name[0]}
              </div>
            )}

            <div>
              <Link
                to={`/blogs/${blog.id}`}
                className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition"
                aria-label='go to blog details'
              >
                {blog.title}
              </Link>
              <div className="text-sm text-gray-500">
                <Link
                  to={`/profile/${blog?.user?.id}`}
                  className="hover:underline"
                >
                  {blog?.user.name}
                </Link>{' '}
                · <span>{new Date(blog.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="text-gray-700 text-sm leading-relaxed">
            <Link to={`/blogs/${blog.id}`} className="hover:text-blue-600" aria-label='go to blog details'>
              <div
                dangerouslySetInnerHTML={{
                  __html: getExcerpt(blog?.content, 25),
                }}
              />
            </Link>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-2">
            <div className="flex gap-2 flex-wrap">
              {blog.tags.slice(0, 2).map((tag) => (
                <Link
                  to={`/tag/${tag.id}`}
                  key={tag.id}
                  aria-label='go to tags content'
                  className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full hover:bg-blue-100 transition"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4 text-gray-500">
              <div className="flex items-center gap-1">
                <FontAwesomeIcon
                  icon={faHeart}
                  className="text-pink-500 w-4 h-4"
                />
                <span className="text-sm">{blog.likes_count}</span>
              </div>
              <div className="flex items-center gap-1">
                <FontAwesomeIcon
                  icon={faComment}
                  className="text-blue-500 w-4 h-4"
                />
                <span className="text-sm">{blog.comments_count}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LastBlogsCard;
