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
