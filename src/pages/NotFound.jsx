import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-50 text-center px-4">
      <h1 className="text-8xl font-extrabold text-red-600 mb-4">404</h1>

      <p className="text-2xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </p>
      <p className="text-gray-600 mb-6">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-2 px-5 rounded-md shadow-md"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
