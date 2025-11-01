import React from 'react';

const LoadingButton = ({
  text = 'Loading...',
  spinnerSize = 'sm',
  color = 'white',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-5 h-5 border-[3px]',
    lg: 'w-6 h-6 border-4',
  };

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <div
        className={`border-${color}/80 border-t-transparent rounded-full animate-spin ${sizeClasses[spinnerSize]}`}
        style={{
          borderColor: color === 'white' ? 'rgba(255,255,255,0.8)' : color,
          borderTopColor: 'transparent',
        }}
      />
      <span className={`text-${color} font-medium text-sm`}>{text}</span>
    </div>
  );
};

export default LoadingButton;
