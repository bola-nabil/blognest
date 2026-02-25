import React, { useEffect, useState } from "react";
import { api } from "@/api";
import { useParams, useNavigate } from "react-router-dom";
import BlogForm from "@/components/blogs/BlogForm";
import UpdateBlogContent from "@/components/blogs/UpdateBlogContent";

const BlogUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState(null);
  const [initialImage, setInitialImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catsRes, tagsRes, blogRes] = await Promise.all([
          api.get("/v1/categories"),
          api.get("/v1/tags"),
          api.get(`/v1/blogs/${id}`),
        ]);

        const blog = blogRes.data.blog;

        setCategories(catsRes.data.categories || []);
        setTags(tagsRes.data.tags || []);

        setInitialValues({
          title: blog.title || "",
          content: blog.content || "",
          categories: blog.categories?.map((c) => c.id) || [],
          tags: blog.tags?.map((t) => t.id) || [],
          image: null,
        });

        setInitialImage(blog.image || null);
      } catch (err) {
        console.error("Error loading blog:", err);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (form) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("_method", "PUT");

      Object.entries(form).forEach(([key, value]) => {
        if (key === "categories" || key === "tags") {
          value.forEach((v) => formData.append(`${key}[]`, v));
        } else if (value) {
          formData.append(key, value);
        }
      });

      await api.post(`/v1/blogs/${id}`, formData);
      navigate(`/blogs/${id}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UpdateBlogContent initialLoading={initialLoading}>
      {initialValues && (
        <BlogForm
          initialValues={initialValues}
          initialImage={initialImage}
          categories={categories}
          tags={tags}
          onSubmit={handleSubmit}
          loading={loading}
          mode="edit"
        />
      )}
    </UpdateBlogContent>
  );
};

export default BlogUpdate;