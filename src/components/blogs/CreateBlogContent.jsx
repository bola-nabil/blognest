import Container from '@/components/Container';
import React from 'react'

const CreateBlogContent = ({children}) => {
  return (
    <Container>
        <div className="max-w-3xl mx-auto mt-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-3xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-700 dark:to-blue-600 p-6">
            <h1 className="text-3xl font-bold text-white text-center">
                ✏️ Create a New Blog
            </h1>
            </div>
            {children}
        </div>
    </Container>
  )
}

export default CreateBlogContent;