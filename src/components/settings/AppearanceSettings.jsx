import React, { useState, useEffect } from 'react';

const AppearanceSettings = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [fontSize, setFontSize] = useState(
    localStorage.getItem('fontSize') || 'base'
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const fontSizeMap = {
      sm: '14px',
      base: '16px',
      lg: '18px',
    };
    document.documentElement.style.fontSize = fontSizeMap[fontSize];
    localStorage.setItem('fontSize', fontSize);
  });
  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 transition">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Appearance Settings
      </h1>

      <div className="mb-8">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
          Theme Mode
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setTheme('light')}
            className={`px-4 py-2 rounded-md border ${
              theme === 'light'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300'
            }`}
          >
            Light
          </button>
          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={`px-4 py-2 rounded-md border ${
              theme === 'dark'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300'
            }`}
          >
            Dark
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
          Font Size
        </label>
        <div className="flex gap-3">
          {['sm', 'base', 'lg'].map((size) => (
            <button
              key={size}
              onClick={() => setFontSize(size)}
              type="button"
              className={`px-4 py-2 rounded-md border capitalize ${
                fontSize === size
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300'
              }`}
            >
              {size === 'sm' ? 'Small' : size === 'base' ? 'Normal' : 'Large'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;
