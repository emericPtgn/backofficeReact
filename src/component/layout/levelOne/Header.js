import React from 'react';
import LogoutButton from '../../common/button/LogoutButton';
import '../../.././App.css'

// Header level ONE est le header principal visible sur toutes les pages du backoffice

function Header() {
  return (
    <div id='container-main-header'>
        <header id='main-header'>
            <span>Bonjour</span>
            <LogoutButton />
        </header>
    </div>
  );
}

export default Header;