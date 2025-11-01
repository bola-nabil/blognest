import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ categories }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/category/${category.id}`}
          className="block p-5 bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-100 
                     dark:border-gray-700 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
        >
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 capitalize truncate">
            {category.name}
          </h2>
        </Link>
      ))}
    </div>
  );
};

export default CategoryCard;
