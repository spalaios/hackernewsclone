import React from 'react';
import './postlist.css';

const PostList = ({ children }) => {
  return (
    <section className="postlist border">
      {children}
    </section>
  );
};

export default PostList;