import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.css';
import { initiateLogin, Authenticate, logout } from './components/auth';
import App from './App';
debugger;
// Funkce pro inicializaci aplikace
async function initializeApp(isAuthenticated) {
  try {
    console.log('Initializing application...');
    if (isAuthenticated === 'init')
    {
      console.log("User initialisation");        
      logout();       
    }
    if (isAuthenticated === 'false') 
    {
      console.log('User not authenticated. Redirecting to login...');
      initiateLogin("index.html?isAuthenticated=true", "https://crmtest.agrotec.cz");
    } else    
    if (isAuthenticated === 'true')
    {
      console.log('User authenticated. Loading User info from CRM...');
      const Au = await Authenticate("https://crmtest.agrotec.cz");
      if (!Au || Au.length === 0) 
      {        
        return false; // Ukončete inicializaci, dokud není uživatel přihlášen
      }
      console.log('User authenticated:', Au);
    }   
    
    return true;
  } catch (error) {
    console.error("Error during application initialization:", error);
    return false;
  }
}

// Zavolání inicializace a následné renderování aplikace
(async () => {
  let isAuthenticatedParameter = new URLSearchParams(window.location.search).has('isAuthenticated') ? new URLSearchParams(window.location.search).get('isAuthenticated') : '';
  console.log('isAuthenticatedParameter:', isAuthenticatedParameter);
  const isAuthenticated = await initializeApp(isAuthenticatedParameter);
  console.log('isAuthenticated:', isAuthenticated);
  if (isAuthenticated)
  {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>  
          <App />  
      </React.StrictMode>
    );
  }
})();
