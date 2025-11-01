import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRightToBracket,
  faGear,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ProfileNav = ({ user, userName, handleShowList, showLists, logout }) => {
  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : '?');

  return (
    <div className="relative">
      <div
        onClick={handleShowList}
        className="cursor-pointer w-12 h-12 rounded-full overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all duration-200"
      >
        {user?.profile_image ? (
          <img
            src={user.profile_image}
            alt="User profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-blue-600 text-white font-semibold text-lg">
            {getInitial(userName)}
          </div>
        )}
      </div>

      {showLists && (
        <div
          onClick={handleShowList}
          className="absolute right-0 mt-3 w-64 rounded-2xl shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
        >
          <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600">
              {user?.profile_image ? (
                <img
                  src={user.profile_image}
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-blue-600 text-white font-semibold text-lg">
                  {getInitial(userName)}
                </div>
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                {user?.name}
              </p>
              <Link
                to={`/profile/${user?.id}`}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                View profile
              </Link>
            </div>
          </div>

          <div className="flex flex-col p-2">
            <Link
              to="/settings"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label='settings link'
            >
              <FontAwesomeIcon
                icon={faGear}
                className="text-gray-600 dark:text-gray-300"
              />
              <span className="text-gray-700 dark:text-gray-200">Settings</span>
            </Link>

            <Link
              to="/create-blog"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition text-left"
              aria-label='create blog link'
            >
              <FontAwesomeIcon icon={faPen} />
              <span className="text-gray-700 dark:text-gray-200">
                Start Writing
              </span>
            </Link>

            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-gray-800 transition text-left"
            >
              <FontAwesomeIcon
                icon={faRightToBracket}
                className="text-red-500"
              />
              <span className="text-gray-700 dark:text-gray-200">Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileNav;
