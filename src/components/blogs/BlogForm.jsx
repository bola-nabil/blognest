import React, {useEffect, useState} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from 'react-select';
import SubmitButton from '@/components/ui/buttons/SubmitButton';
import {selectStyles} from "@/utils/ckEditor";

const BlogForm = ({initialValues,initialImage = null, onSubmit,loading,tags, categories,  mode="create"}) => {
    const [form, setForm] = useState(initialValues);
    const [imagePreview, setImagePreview] = useState(initialImage);

     useEffect(() => {
        setForm(initialValues);
  }, [initialValues]);

   useEffect(() => {
    setImagePreview(initialImage);
  }, [initialImage]);


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

    const submitHandler = (e) => {
        e.preventDefault();
        onSubmit(form);
  };

  return (
    <form onSubmit={submitHandler} className={`${mode === "edit" ? "space-y-8" : "p-8 space-y-8"}`}>

        {
            mode === "edit" && (
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
            )
        }
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

        {
            mode === "create" && (
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

            )
        }
        
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

        <div className="pt-4">
            <SubmitButton loading={loading} text='Publish Blog'/>
        </div>
    </form>
  )
}

export default BlogForm