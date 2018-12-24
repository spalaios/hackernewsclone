import React from 'react';
import './postlist.css';

const PostList = ({ children }) => {
  return (
    <section className="postlist pt-2">
      {children}
    </section>
  );
};

export default PostList;