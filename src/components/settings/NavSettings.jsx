import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faLock,
  faBars,
  faXmark,
  faPalette,
} from '@fortawesome/free-solid-svg-icons';

const NavSettings = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    {
      id: 1,
      title: 'Update Profile',
      path: '/settings/update-profile',
      icon: faUser,
    },
    { id: 2, title: 'Security', path: '/settings/security', icon: faLock },
    {
      id: 3,
      title: 'Appearance',
      path: '/settings/appearance',
      icon: faPalette,
    },
  ];

  return (
    <aside className="w-full md:w-64 bg-white dark:bg-gray-800 md:border-r border-gray-200 dark:border-gray-700 p-4 md:p-6 md:h-[calc(100vh-64px)] transition-colors duration-300">
      <div className="md:hidden mb-6">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center justify-between w-full bg-blue-600 text-white font-medium rounded-lg p-3 shadow-md"
        >
          <span>Settings Menu</span>
          <FontAwesomeIcon icon={mobileOpen ? faXmark : faBars} />
        </button>

        {mobileOpen && (
          <div className="mt-2 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-md transition-colors duration-300">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 border-b dark:border-gray-700 last:border-0 transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <FontAwesomeIcon icon={link.icon} className="w-4" />
                {link.title}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="hidden md:flex flex-col">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 transition-colors duration-300">
          Settings
        </h2>
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                to={link.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <FontAwesomeIcon icon={link.icon} className="w-4" />
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default NavSettings;
