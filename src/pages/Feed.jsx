import React from 'react';
import Container from '@/components/Container';
import FeedBlogs from '@/components/blogs/FeedBlogs';

const Feed = () => {
  return (
    <Container>
      <div className="feeds">
        <FeedBlogs />
      </div>
    </Container>
  );
};

export default Feed;
