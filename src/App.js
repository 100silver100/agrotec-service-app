import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Dashboard />
      <Footer />
    </div>
  );
}

export default App;
