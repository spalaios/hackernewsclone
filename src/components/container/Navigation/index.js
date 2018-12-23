import React from 'react';
import './navigation.css';

const NavigtionBar = () => {
  return (
    <section className="navigation d-flex border navigation-bar">
      <div className="navigation__hn-logo mx-1 d-flex align-self-center">
        <img src={'/src/assets/images/hnlogo.gif'} alt="Y" className="hacker-news-logo" />
      </div>
      <div className="navigation__hn-name d-flex align-items-center mx-1">
        <p className="text-capitalize hacker-news-name mb-0">Hacker News</p>
      </div>
      <div className="navigation__tabs d-flex">
        <p className="mb-0 mx-1">new |</p>
        <p className="mb-0 mx-1">comments |</p>
        <p className="mb-0 mx-1">show |</p>
        <p className="mb-0 mx-1">ask |</p>
        <p className="mb-0 mx-1">jobs</p>
      </div>
    </section>
  );
};

export default NavigtionBar;