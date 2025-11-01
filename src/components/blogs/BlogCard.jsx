import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import { getExcerpt } from '@/utils/getExcerpt';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog, handleToggleBookmark }) => {
  return (
    <div
      className="feed-card bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4"
      key={blog.id}
    >
      <Link to={`/blogs/${blog.id}`} key={blog.id}>
        <div className="feed-img">
          <img
            src={blog?.image}
            alt={blog?.title}
            className="w-full h-60 object-cover rounded-2xl"
          />
        </div>
      </Link>

      <div className="feed-content mt-4">
        <div className="feed-header flex items-center gap-3">
          {blog?.user?.profile_image ? (
            <img
              src={blog?.user?.profile_image}
              alt="blog user"
              className="w-12 h-12 rounded-full border object-cover"
            />
          ) : (
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg">
              {blog?.user?.name[0] || 'U'}
            </div>
          )}
          <div className="feed-info">
            <Link to={`/blogs/${blog.id}`}>
              <h2 className="font-bold text-xl text-gray-800">{blog.title}</h2>
            </Link>
            <p className="text-sm text-gray-500">
              <Link to={`/profile/${blog?.user?.id}`}>{blog?.user?.name}</Link>{' '}
              • {new Date(blog.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Excerpt */}
        <Link to={`/blogs/${blog.id}`} key={blog.id}>
          <div className="feed-excerpt py-4 text-gray-600 text-base leading-relaxed">
            <div
              dangerouslySetInnerHTML={{
                __html: getExcerpt(blog?.content, 15),
              }}
            />
          </div>
        </Link>

        <div className="feed-tags flex flex-wrap gap-2 mb-4">
          {blog.tags.map((tag) => (
            <Link to={`/tag/${tag.id}`} key={tag.id}>
              <span
                key={tag.id}
                className="bg-blue-100 text-blue-900 px-3 py-1 text-sm rounded-full hover:bg-blue-200 transition"
              >
                #{tag.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="feed-footer flex justify-between items-center border-t pt-3">
          <Link to={`/blogs/${blog.id}`}>
            <div className="flex gap-5 text-gray-600 text-sm">
              <div className="flex items-center gap-1 hover:text-red-500 transition">
                <FontAwesomeIcon icon={faHeart} />
                <span>{blog.likes_count}</span>
              </div>
              <div className="flex items-center gap-1 hover:text-blue-500 transition">
                <FontAwesomeIcon icon={faComment} />
                <span>{blog.comments_count}</span>
              </div>
            </div>
          </Link>

          <div
            className="cursor-pointer"
            onClick={() => handleToggleBookmark(blog.id)}
          >
            {blog.bookmarked ? (
              <FontAwesomeIcon
                icon={solidBookmark}
                className="text-yellow-500 text-xl"
              />
            ) : (
              <FontAwesomeIcon
                icon={regularBookmark}
                className="text-gray-400 text-xl hover:text-gray-600 transition"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
