import React from 'react';
import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNotifications } from '@/hooks/useNotifications';

const NotificationBell = () => {
  const { notifications, loading } = useNotifications();

  if (loading) return null;

  const unreadCount = notifications.filter((n) => !n.read_at).length;

  return (
    <Link
      to="/notifications"
      className="relative flex items-center justify-center"
      aria-label="notifications bell"
    >
      <Bell className="w-6 h-6 text-white hover:text-blue-200 transition-colors duration-200" />

      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow-md">
          {unreadCount}
        </span>
      )}
    </Link>
  );
};

export default NotificationBell;
