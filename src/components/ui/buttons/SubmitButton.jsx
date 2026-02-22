import React from 'react';
import LoadingButton from '@/components/Loading/LoadingButton';

const SubmitButton = ({loading, text}) => {
  return (
    
    <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 shadow-md ${
        loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
    >
        {loading ? <LoadingButton /> : `${text}`}
    </button>
  )
}

export default SubmitButton;