import React from 'react';
import { useUsers } from '@/hooks/useUsers';
import { useFollow } from '@/hooks/useFollow';

const HowToFollow = () => {
  const { users, loading } = useUsers();

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 border rounded-xl animate-pulse"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full" />
              <div className="space-y-2">
                <div className="w-24 h-3 bg-gray-200 rounded" />
                <div className="w-16 h-3 bg-gray-100 rounded" />
              </div>
            </div>
            <div className="w-20 h-7 bg-gray-200 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  if (users.length === 0) {
    return <p className="text-gray-500 text-sm">No users found.</p>;
  }

  return (
    <div className="space-y-4">
      {users.map((author) => (
        <UserFollowCard key={author.id} author={author} />
      ))}
    </div>
  );
};

const UserFollowCard = ({ author }) => {
  const { isFollowing, toggleFollow, loading } = useFollow(author.is_following);

  return (
    <div className="flex items-center justify-between p-4 border rounded-xl hover:shadow-sm transition-all duration-200 bg-white">
      <div className="flex items-center gap-3">
        <img
          src={author.profile_image || '/default-avatar.png'}
          alt={author.name}
          className="w-10 h-10 rounded-full object-cover border"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{author.name}</h3>
          <p className="text-sm text-gray-500">@{author.username}</p>
        </div>
      </div>

      <button
        disabled={loading}
        onClick={() => toggleFollow(author.id)}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
          isFollowing
            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </button>
    </div>
  );
};

export default HowToFollow;
