import React from 'react';
import NavigationBar from '../container/Navigation/index';
import Footer from '../container/Footer/Footer';

const MainViewContainer = ({ children, history }) => {
  return ( 
    <div className="container">
     <div className="mt-2">
       <NavigationBar history={history} />
     </div>
      {children}
     <div className="post-list-bottom-orange-border">
       <Footer />
     </div>
   </div>
  );
};
 
export default MainViewContainer;