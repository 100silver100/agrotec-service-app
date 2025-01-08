import React from 'react';
import { logout, logoutFromAdfs } from './auth';

function Header() {
  return (
    <header className="header">
      <h1>Agrotec Servisní aplikace</h1>
      <div className="user-info">
        <span className="user-avatar">JS</span>        
        <button className="logout-button" onClick={() => {logout();}}>Log Out</button>
      </div>
    </header>
  );
}

export default Header;
