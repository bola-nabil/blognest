import React from 'react';
import { Link } from 'react-router-dom';

const ServerFaild = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-50 text-center px-4">
      <div className="text-6xl mb-4">😞</div>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">Server Error</h1>
      <p className="text-gray-600 mb-6">
        Oops! Something went wrong. Please try again later or log in again.
      </p>

      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-2 px-5 rounded-md shadow-md"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default ServerFaild;
