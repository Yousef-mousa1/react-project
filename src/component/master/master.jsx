import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../nav/nav.jsx';
import Footer from '../footer/footer.jsx';


export default function Master({ userData, logout , cartItemCount}) {
  return (
    <>
      <Nav userData={userData} logout={logout} cartItemCount={cartItemCount} />
     
      <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
        <main className="flex-grow-1">
          <Outlet />
        </main>
      </div>

      <Footer />

    </>
  );
}
