import React, { useEffect, useState } from 'react';
import { api } from '@/api';
import { useParams, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from 'react-select';
import LoadingButton from '@/components/Loading/LoadingButton';

const BlogUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    content: '',
    categories: [],
    tags: [],
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catsRes, tagsRes, blogRes] = await Promise.all([
          api.get('/v1/categories'),
          api.get('/v1/tags'),
          api.get(`/v1/blogs/${id}`),
        ]);

        setCategories(catsRes.data.categories || []);
        setTags(tagsRes.data.tags || []);

        const blog = blogRes.data.blog;
        setForm({
          title: blog.title || '',
          content: blog.content || '',
          categories: blog.categories?.map((c) => c.id) || [],
          tags: blog.tags?.map((t) => t.id) || [],
          image: null,
        });
        setImagePreview(blog.image || null);
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleCategoryChange = (selectedOptions) => {
    setForm({
      ...form,
      categories: selectedOptions.map((opt) => opt.value),
    });
  };

  const handleTagChange = (selectedOptions) => {
    setForm({
      ...form,
      tags: selectedOptions.map((opt) => opt.value),
    });
  };

  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'var(--select-bg)',
      borderColor: state.isFocused ? '#3b82f6' : 'var(--select-border)',
      boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : 'none',
      '&:hover': { borderColor: '#3b82f6' },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'var(--select-bg)',
      color: 'var(--select-text)',
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? 'rgba(59,130,246,0.2)'
        : 'var(--select-bg)',
      color: 'var(--select-text)',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(59,130,246,0.2)',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'var(--select-text)',
    }),
  };

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    document.documentElement.style.setProperty(
      '--select-bg',
      isDark ? '#1f2937' : '#ffffff'
    );
    document.documentElement.style.setProperty(
      '--select-text',
      isDark ? '#f9fafb' : '#111827'
    );
    document.documentElement.style.setProperty(
      '--select-border',
      isDark ? '#374151' : '#d1d5db'
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('_method', 'PUT');
      formData.append('title', form.title);
      formData.append('content', form.content);
      if (form.image) formData.append('image', form.image);
      form.categories.forEach((id) => formData.append('categories[]', id));
      form.tags.forEach((id) => formData.append('tags[]', id));

      await api.post(`/v1/blogs/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigate(`/blogs/${id}`);
    } catch (err) {
      console.error('Error updating blog:', err);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 dark:text-gray-200 font-medium">
            Loading blog data...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-10 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-3xl p-8 transition">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">
          ✏️ Update Blog
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col items-center">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Blog"
                className="w-72 h-40 object-cover rounded-xl border border-gray-300 dark:border-gray-600 shadow-md"
              />
            ) : (
              <div className="w-32 h-32 bg-gray-100 dark:bg-gray-700 flex items-center justify-center rounded-xl text-gray-400 dark:text-gray-500">
                No Image
              </div>
            )}
            <label
              htmlFor="image"
              className="mt-3 text-sm font-medium text-blue-600 dark:text-blue-400 cursor-pointer hover:underline"
            >
              Change Image
            </label>
            <input
              type="file"
              id="image"
              className="hidden"
              accept="image/*"
              onChange={handleFile}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Blog Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Blog Content
            </label>
            <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden dark:bg-gray-800">
              <CKEditor
                editor={ClassicEditor}
                data={form.content}
                onReady={(editor) => {
                  const isDark =
                    document.documentElement.classList.contains('dark');
                  editor.editing.view.change((writer) => {
                    writer.setStyle(
                      'background-color',
                      isDark ? '#1f2937' : '#ffffff',
                      editor.editing.view.document.getRoot()
                    );
                    writer.setStyle(
                      'color',
                      isDark ? '#f9fafb' : '#111827',
                      editor.editing.view.document.getRoot()
                    );
                  });
                  const toolbar = editor.ui.view.toolbar.element;
                  toolbar.style.backgroundColor = isDark
                    ? '#f3f4f6'
                    : '#f9fafb';
                  toolbar.style.color = '#111827';
                  toolbar.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setForm({ ...form, content: data });
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Select Categories
            </label>
            <Select
              isMulti
              options={categories.map((cat) => ({
                value: cat.id,
                label: cat.name,
              }))}
              value={categories
                .filter((cat) => form.categories.includes(cat.id))
                .map((cat) => ({ value: cat.id, label: cat.name }))}
              onChange={handleCategoryChange}
              styles={selectStyles}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Select Tags
            </label>
            <Select
              isMulti
              options={tags.map((tag) => ({
                value: tag.id,
                label: tag.name,
              }))}
              value={tags
                .filter((tag) => form.tags.includes(tag.id))
                .map((tag) => ({ value: tag.id, label: tag.name }))}
              onChange={handleTagChange}
              styles={selectStyles}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 shadow-md ${
              loading
                ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {loading ? <LoadingButton /> : 'Update Blog'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogUpdate;
