import React from 'react';
import backgroundImage from '../../assets/food-packaging-yellow-background-quarantine-food-delivery-home-flatlay-banner-with-copyspace_168091-166.jpg'; 

const AuthLayout = ({ children }) => {
  return (
    <div 
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: 'calc(100vh - 56px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 0'
      }}
    >
      {children}
    </div>
  );
};

export default AuthLayout;
