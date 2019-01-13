import React from 'react';
import NavigationBar from '../container/Navigation/index';
import Footer from '../container/Footer/Footer';
import Provider from '../container/ContextAPI/Provider';

const MainViewContainer = ({ children, history }) => {
  // creating clonedChildren of dynamic children and passing the required props to it
  // const clonedChildren = React.Children.map(children, (child) => {
  //   return React.cloneElement(child, { history });
  // });
  return ( 
    <div className="container">
     <div className="mt-2">
       <NavigationBar history={history} />
     </div>
      <Provider history={history}>
        {children}
      </Provider>
     <div className="post-list-bottom-orange-border">
       <Footer />
     </div>
   </div>
  );
};
 
export default MainViewContainer;