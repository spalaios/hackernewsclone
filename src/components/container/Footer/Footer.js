import React from 'react';
import './footer.css';

const Footer = () => {
  return ( 
    <div className="footer-links-block text-center pb-1">
      <a className="cursor gray" href="#">Guidelines |</a> 
      <a className="cursor gray" href="#"> FAQ |</a>
      <a className="cursor" href="#"> Support |</a>
      <a className="cursor gray" href="#"> API |</a>
      <a className="cursor" href="#"> Security |</a>
      <a className="cursor" href="#"> Lists |</a> 
      <a className="cursor" href="#"> Bookmarklet |</a>
      <a className="cursor" href="#"> Legal |</a>
      <a className="cursor" href="#"> Apply to YC |</a>
      <a className="cursor" href="#"> Contact</a>
      <div className="footer__search mt-3 mb-4">
        <span>
          Search:  
          <input 
            type="text" 
            name="q" 
            autoCorrect="off" 
            spellCheck="false"
            autoComplete="off"
            autoCapitalize="off"
            className="ml-1 py-1"
          />
          </span>
      </div>
    </div>
  );
};
 
export default Footer;