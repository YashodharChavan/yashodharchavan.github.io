import React, { useEffect } from 'react';

const Toast = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div style={{
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: 'rgba(60, 60, 60, 0.85)',
      color: 'white',
      padding: '8px 14px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
      zIndex: 1000,
      userSelect: 'none',
      pointerEvents: 'none',
      maxWidth: '250px',
      textAlign: 'center',
      backdropFilter: 'blur(6px)'
    }}>
      {message}
    </div>
  );
};

export default Toast;
