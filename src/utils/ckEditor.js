  export const selectStyles = {
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

export const applyCKEditorDarkMode = (isDark) => {
    const editors = document.querySelectorAll('.ck.ck-editor__main');
    const toolbars = document.querySelectorAll('.ck.ck-toolbar');

    editors.forEach((el) => {
      el.style.backgroundColor = isDark ? '#1f2937' : '#ffffff'; // content area
      el.style.color = isDark ? '#f9fafb' : '#111827';
    });

    toolbars.forEach((el) => {
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

