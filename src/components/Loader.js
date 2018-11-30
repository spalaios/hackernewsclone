import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Loader = ({ isLoading, children }) => {
  if (isLoading) {
    return <p className="mb-0">Loading</p>;
  }
  return (
    <Fragment>
      {children}
    </Fragment>
  );
};
export default Loader;
