import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from '@/components/Container';
import NavSettings from '@/components/settings/NavSettings';

const Settings = () => {
  return (
    <div className="flex flex-col md:flex-row pt-20 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full md:w-64 md:fixed md:top-16 md:left-0 md:h-[calc(100vh-64px)] border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 z-40">
        <NavSettings />
      </div>

      <div className="flex-1 md:ml-64 p-6 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Outlet />
      </div>
    </div>
  );
};

export default Settings;
