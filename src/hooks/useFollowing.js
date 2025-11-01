import { useState, useEffect } from 'react';
import { api } from '@/api';

export const useFollowing = (userId, currentUserId) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    if (!userId || !currentUserId) return;

    const fetchFollowState = async () => {
      try {
        const res = await api.get(`/v1/users/${currentUserId}/followings`);
        const isUserFollowed = res.data.followings?.some(
          (u) => u.id === userId
        );
        setIsFollowing(isUserFollowed);

        const followersRes = await api.get(`/v1/users/${userId}/followers`);
        setFollowersCount(followersRes.data.followers?.length || 0);
      } catch (err) {
        console.error('Error fetching follow state:', err);
      }
    };

    fetchFollowState();
  }, [userId, currentUserId]);

  const toggleFollow = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      if (isFollowing) {
        await api.delete(`/v1/users/${userId}/unfollow`);
        setIsFollowing(false);
        setFollowersCount((prev) => Math.max(prev - 1, 0));
      } else {
        await api.post(`/v1/users/${userId}/follow`);
        setIsFollowing(true);
        setFollowersCount((prev) => prev + 1);
      }
    } catch (err) {
      console.error('Error toggling follow:', err);
    } finally {
      setLoading(false);
    }
  };

  return { isFollowing, toggleFollow, loading, followersCount, setIsFollowing };
};
