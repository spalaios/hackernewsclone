import React from 'react';
import './navigation.css';

function navigateTo(route, history) {
  history.push(route);
}

class NavigationBar extends React.Component { // TODO: implement from nav bar based 
  constructor(props) {
    super(props);
    this.state = {
      new: 0,
    };
  }

  componentDidMount() {
    // this.getCurrentPathName();
  }

  componentWillUnmount() {
    // kill all request
  }

  navigateTo = (route) => {
    if (route === 'logo') {
      route = '';
    }
    this.props.history.push(`/${route}`);
  }

  getCurrentPathName = () => { // TODO: find out why this functioon is not working directly in render 
    return this.props.history.location.pathname.split('/')[1];
  }

  render() {
    return (
      <section className="navigation d-flex border navigation-bar">
        <div className="navigation__hn-logo mx-1 d-flex align-self-center cursor" onClick={() => this.navigateTo('logo')} >
          <img
            src={'/src/assets/images/hnlogo.gif'}
            alt="Y"
            className="hacker-news-logo"
          />
        </div>
        <div className="navigation__hn-name d-flex align-items-center mx-1 cursor">
          <p className="text-capitalize hacker-news-name mb-0">Hacker News</p>
        </div>
        <div className="navigation__tabs d-flex">
          <p className={`mb-0 mx-1 cursor ${(this.props.history.location.pathname.split('/')[1] === 'newest') ? 'text-white' : ''}`} onClick={() => this.navigateTo('newest') } >new <span className="text-black">|</span></p>
          <p className={`mb-0 mx-1 cursor ${(this.props.history.location.pathname.split('/')[1] === 'comments') ? 'text-white' : ''}`} onClick={() => this.navigateTo('comments') }>comments <span className="text-black">|</span></p>
          <p className={`mb-0 mx-1 cursor ${(this.props.history.location.pathname.split('/')[1] === 'show') ? 'text-white' : ''}`} onClick={() => this.navigateTo('show') }>show <span className="text-black">|</span></p>
          <p className={`mb-0 mx-1 cursor ${(this.props.history.location.pathname.split('/')[1] === 'ask') ? 'text-white' : ''}`} onClick={() => this.navigateTo('ask') }>ask <span className="text-black">|</span></p>
          <p className={`mb-0 mx-1 cursor ${(this.props.history.location.pathname.split('/')[1] === 'jobs') ? 'text-white' : ''}`} onClick={() => this.navigateTo('jobs') }>jobs</p>
        </div>
      </section>
    );
  }
}

export default NavigationBar;
