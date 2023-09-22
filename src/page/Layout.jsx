import React from 'react';
import DrawerAppBar from './Home';

const Layout = ({ children }) => {
  return (
    <div>
      <DrawerAppBar />
      {children}
    </div>
  );
};

export default Layout;
