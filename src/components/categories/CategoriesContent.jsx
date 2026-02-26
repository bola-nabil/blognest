import React from 'react';
import CategoryCard from './CategoryCard';
import { useCategories } from '@/hooks/useCategories';
import {CategoriesContentLoading} from "../Loading";

const CategoriesContent = () => {
  const { categories, loading } = useCategories();

  if (loading) {
    return <CategoriesContentLoading />;
  }

  return (
    <div>
      {categories.length > 0 ? (
        <CategoryCard categories={categories} />
      ) : (
        <p className="text-gray-500 text-center py-10">No categories found.</p>
      )}
    </div>
  );
};

export default CategoriesContent;
