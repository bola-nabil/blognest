import React from 'react';
import Container from '@/components/Container';
import CategoriesContent from '@/components/categories/CategoriesContent';

const Categories = () => {
  return (
    <Container>
      <div className="text-center py-10 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Explore Categories</h1>
        <p className="mt-3 text-base md:text-lg opacity-90">
          Find blogs you love — sorted by topics that matter to you
        </p>
      </div>

      <CategoriesContent />
    </Container>
  );
};

export default Categories;
