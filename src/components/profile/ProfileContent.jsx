import React, { useState, useEffect } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { useUserAuth } from '@/hooks/useUserAuth';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { api } from '@/api';
import { Edit, Trash2, XCircle, MapPin, Globe } from 'lucide-react';
import { handleDeleteBlog, handleRemoveBookmark } from '@/utils/handleDelete';
import { sortedBlogs, sortedBookmarks } from '@/utils/sorting';

const ProfileContent = () => {
  const { id } = useParams();
  const { profile, loading } = useProfile(id);
  const { user } = useUserAuth();

  const [isFollowing, setIsFollowing] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
    if (profile && profile.is_following !== undefined) {
      setIsFollowing(profile.is_following);
    }
  }, [profile]);

  const isMyProfile = user?.id === Number(id);

  const handleFollowToggle = async () => {
    try {
      setProcessing(true);
      if (isFollowing) {
        await api.delete(`/v1/users/${id}/unfollow`);
        setIsFollowing(false);
      } else {
        await api.post(`/v1/users/${id}/follow`);
        setIsFollowing(true);
      }
    } catch (err) {
      console.error('Error following/unfollowing:', err);
    } finally {
      setProcessing(false);
    }
  };

  const blogs = sortedBlogs(profile);
  const bookmarks = sortedBookmarks(profile);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto pb-20">
        <div className="bg-gray-300 dark:bg-gray-700 w-full h-40 rounded-lg animate-pulse"></div>

        <div className="flex justify-center -mt-14">
          <div className="w-28 h-28 rounded-full border-4 border-white dark:border-gray-900 bg-gray-400 dark:bg-gray-600 animate-pulse"></div>
        </div>

        <div className="text-center mt-8 space-y-3">
          <div className="w-40 h-5 bg-gray-300 dark:bg-gray-700 rounded mx-auto animate-pulse"></div>
          <div className="w-60 h-4 bg-gray-200 dark:bg-gray-700 rounded mx-auto animate-pulse"></div>
        </div>

        <div className="flex justify-center gap-6 mt-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center space-y-2">
              <div className="w-10 h-5 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="w-14 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pb-20 text-gray-800 dark:text-gray-100">
      <div className="bg-gray-600 dark:bg-gray-700 w-full h-40 rounded-lg relative flex justify-center">
        <div className="absolute -bottom-12 bg-blue-600 w-28 h-28 rounded-full flex justify-center items-center border-4 border-white dark:border-gray-900 shadow-md">
          {profile?.profile_image ? (
            <img
              src={profile.profile_image}
              alt={profile.name[0]}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-white font-bold text-2xl">
              {profile?.name ? profile.name[0] : 'U'}
            </span>
          )}
        </div>
      </div>

      <div className="mt-16 text-center">
        <h1 className="font-bold text-2xl">{profile?.name}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          {profile?.bio || 'No bio yet.'}
        </p>

        <div className="mt-4 flex flex-col items-center gap-2 text-gray-600 dark:text-gray-400">
          {profile?.location && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={16} />
              <span>{profile.location}</span>
            </div>
          )}
          {profile?.website && (
            <div className="flex items-center gap-2 text-sm">
              <Globe size={16} />
              <a
                href={
                  profile.website.startsWith('http')
                    ? profile.website
                    : `https://${profile.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {profile.website}
              </a>
            </div>
          )}
        </div>

        <div className="mt-5">
          {isMyProfile ? (
            <Link to="/settings/update-profile">
              <Button className="bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 rounded-full px-6">
                Edit Profile
              </Button>
            </Link>
          ) : (
            <Button
              disabled={processing}
              onClick={handleFollowToggle}
              className={`rounded-full px-6 ${
                isFollowing
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
          )}
        </div>

        <div className="flex justify-center gap-6 mt-6 text-gray-700 dark:text-gray-300">
          <div className="text-center">
            <p className="font-bold">{profile?.followers_count ?? 0}</p>
            <p className="text-sm">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-bold">{profile?.followings_count ?? 0}</p>
            <p className="text-sm">Following</p>
          </div>
          <div className="text-center">
            <p className="font-bold">{profile?.blogs?.length ?? 0}</p>
            <p className="text-sm">Posts</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 flex justify-center gap-6 border-b border-gray-300 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('posts')}
          className={`pb-2 px-4 font-medium ${
            activeTab === 'posts'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          Posts
        </button>
        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`pb-2 px-4 font-medium ${
            activeTab === 'bookmarks'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          Bookmarks
        </button>
      </div>

      {/* Posts / Bookmarks */}
      <div className="mt-6">
        {activeTab === 'posts' ? (
          blogs.length > 0 ? (
            <div className="space-y-4">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700"
                >
                  <Link to={`/blogs/${blog.id}`}>
                    <h2 className="font-bold text-lg">{blog.title}</h2>
                  </Link>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                    {blog.content?.replace(/<[^>]+>/g, '').slice(0, 100)}...
                  </p>

                  <div className="flex items-center justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <p>
                      Posted on {new Date(blog.created_at).toLocaleDateString()}
                    </p>
                    {isMyProfile && (
                      <div className="flex items-center gap-3">
                        <Link to={`/blogs/${blog.id}/edit`}>
                          <Edit
                            size={16}
                            className="cursor-pointer text-blue-500"
                          />
                        </Link>
                        <Trash2
                          size={16}
                          className="cursor-pointer text-red-500"
                          onClick={() => handleDeleteBlog(blog.id)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No posts yet.
            </p>
          )
        ) : bookmarks.length > 0 ? (
          <div className="space-y-4">
            {bookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700"
              >
                <Link to={`/blogs/${bookmark.pivot.blog_id}`}>
                  <h2 className="font-semibold">
                    {bookmark.title || 'Untitled'}
                  </h2>
                </Link>

                <div className="flex items-center justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <p>
                    Saved on{' '}
                    {new Date(bookmark.created_at).toLocaleDateString()}
                  </p>
                  {isMyProfile && (
                    <XCircle
                      size={16}
                      className="cursor-pointer text-red-500"
                      onClick={() => handleRemoveBookmark(bookmark)}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No bookmarks yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileContent;
