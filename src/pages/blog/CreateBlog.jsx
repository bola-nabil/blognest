import React, { useState, useEffect } from 'react';
import { api } from '@/api';
import { useNavigate } from 'react-router-dom';
import BlogForm from '@/components/blogs/BlogForm';
import CreateBlogContent from '@/components/blogs/CreateBlogContent';

const CreateBlog = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const initialValues = {
    title: "",
    content: "",
    categories: [],
    tags: [],
    image: null,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catsRes, tagsRes] = await Promise.all([
          api.get('/v1/categories'),
          api.get('/v1/tags'),
        ]);
        setCategories(catsRes.data.categories || []);
        setTags(tagsRes.data.tags || []);
      } catch (err) {
        console.error("Can't fetch categories/tags data", err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (form) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === "categories" || key === "tags") {
          value.forEach((v) => formData.append(`${key}[]`, v));
        } else if (value) {
          formData.append(key, value);
        }
      });

      await api.post("/v1/blogs", formData);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CreateBlogContent>
      <BlogForm
        categories={categories} 
        tags={tags} 
        initialValues={initialValues} 
        onSubmit={handleSubmit} 
        loading={loading}
        mode='create'
      />
    </CreateBlogContent>
  );
};

export default CreateBlog;
