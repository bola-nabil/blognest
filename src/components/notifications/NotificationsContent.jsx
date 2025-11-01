import React from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import { api } from '@/api';

const NotificationsContent = () => {
  const { notifications, setNotifications, loading } = useNotifications();

  const markAsRead = async (id) => {
    try {
      await api.post(`v1/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, read_at: new Date().toISOString() } : n
        )
      );
    } catch (err) {
      console.error('Error marking notification as read', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.post('/v1/notifications/read-all');
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, read_at: new Date().toISOString() }))
      );
    } catch (err) {
      console.error('Error marking all as read', err);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-40 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-8 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>

        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="p-4 border rounded-xl shadow-sm bg-gray-100 dark:bg-gray-800"
          >
            <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-60 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <button
          onClick={markAllAsRead}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Mark All as Read
        </button>
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications yet.</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-xl border shadow-sm flex items-center justify-between transition-all ${
                n.read_at
                  ? 'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                  : 'bg-blue-50 dark:bg-blue-900/30'
              }`}
            >
              <div>
                <h2 className="font-semibold text-gray-800 dark:text-gray-100">
                  {n.data?.follower_name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {n.data?.message}
                </p>
                <span className="text-xs text-gray-400">
                  {new Date(n.created_at).toLocaleString()}
                </span>
              </div>

              {!n.read_at && (
                <button
                  onClick={() => markAsRead(n.id)}
                  className="ml-4 px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Mark as Read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsContent;
