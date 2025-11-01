import React from 'react';
import Container from '@/components/Container';
import ExploreBlogs from '@/components/explore/ExploreBlogs';

const Explore = () => {
  return (
    <Container>
      <div className="explore">
        <ExploreBlogs />
      </div>
    </Container>
  );
};

export default Explore;
