import React, { useState, useEffect } from 'react';
import './../styles/footer.css';

const Footer = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <footer className="footer">
      <div className="status">
        {isOnline ? (
          <span className="status-online">
            🟢 Online
          </span>
        ) : (
          <span className="status-offline">
            🔴 Offline
          </span>
        )}
      </div>
    </footer>
  );
};

export default Footer;
