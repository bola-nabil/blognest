import React, { useState, useEffect } from 'react';
import { api } from '@/api';
import { useNavigate } from 'react-router-dom';
import Container from '@/components/Container';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from 'react-select';
import LoadingButton from '@/components/Loading/LoadingButton';

const CreateBlog = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    content: '',
    categories: [],
    tags: [],
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFile = (e) => {
    setForm({ ...form, image: e.target.files[0] });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('content', form.content);
      if (form.image) formData.append('image', form.image);
      form.categories.forEach((cat, i) =>
        formData.append(`categories[${i}]`, cat)
      );
      form.tags.forEach((tag, i) => formData.append(`tags[${i}]`, tag));

      await api.post('/v1/blogs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/');
    } catch (err) {
      console.error("Can't submit blog", err);
    } finally {
      setLoading(false);
    }
  };

  // react-select styling
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
    singleValue: (provided) => ({
      ...provided,
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
    input: (provided) => ({
      ...provided,
      color: 'var(--select-text)',
    }),
  };

  // 🌓 Watch for dark mode changes
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

  // 🌙 CKEditor Dark Mode Fix
  const applyCKEditorDarkMode = (isDark) => {
    const editors = document.querySelectorAll('.ck.ck-editor__main');
    const toolbars = document.querySelectorAll('.ck.ck-toolbar');

    editors.forEach((el) => {
      el.style.backgroundColor = isDark ? '#1f2937' : '#ffffff'; // content area
      el.style.color = isDark ? '#f9fafb' : '#111827';
    });

    toolbars.forEach((el) => {
      // keep toolbar light in dark mode
      el.style.backgroundColor = isDark ? '#f3f4f6' : '#f9fafb';
      el.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
      el.style.color = '#111827'; // make icons visible
    });

    const contents = document.querySelectorAll('.ck-content');
    contents.forEach((el) => {
      el.style.backgroundColor = isDark ? '#1f2937' : '#ffffff';
      el.style.color = isDark ? '#f9fafb' : '#111827';
    });
  };

  return (
    <Container>
      <div className="max-w-3xl mx-auto mt-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-3xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-700 dark:to-blue-600 p-6">
          <h1 className="text-3xl font-bold text-white text-center">
            ✏️ Create a New Blog
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
            >
              Blog Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter your blog title..."
              value={form.title}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />
          </div>

          {/* Content */}
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

                  // fix toolbar color
                  const toolbar = editor.ui.view.toolbar.element;
                  toolbar.style.backgroundColor = isDark
                    ? '#f3f4f6'
                    : '#f9fafb';
                  toolbar.style.color = '#111827';
                  toolbar.style.borderColor = isDark ? '#4b5563' : '#d1d5db';

                  applyCKEditorDarkMode(isDark);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setForm({ ...form, content: data });
                }}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Upload Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="block w-full text-sm text-gray-700 dark:text-gray-300
                         file:mr-4 file:py-2 file:px-4 file:rounded-lg
                         file:border-0 file:font-semibold
                         file:bg-blue-600 file:text-white
                         hover:file:bg-blue-700 transition"
            />
            {form.image && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Selected: {form.image.name}
              </p>
            )}
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Select Categories
            </label>
            <Select
              isMulti
              name="categories"
              options={categories.map((cat) => ({
                value: cat.id,
                label: cat.name,
              }))}
              onChange={handleCategoryChange}
              styles={selectStyles}
              placeholder="Search or select categories..."
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Select Tags
            </label>
            <Select
              isMulti
              name="tags"
              options={tags.map((tag) => ({
                value: tag.id,
                label: tag.name,
              }))}
              onChange={handleTagChange}
              styles={selectStyles}
              placeholder="Search or select tags..."
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 shadow-md ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {loading ? <LoadingButton /> : 'Publish Blog'}
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default CreateBlog;
