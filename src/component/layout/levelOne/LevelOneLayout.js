import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import LeftSidebar from './LeftSidebar';
import Header from './Header';
import '../../.././App.css'

function LevelOneLayout({ setIsAuthenticated }) {

  return (
    <div>
      <Header setIsAuthenticated={setIsAuthenticated}/>
      <main id="main">
        <LeftSidebar />
        <Outlet />
      </main>
    </div>
  );
}

export default LevelOneLayout;