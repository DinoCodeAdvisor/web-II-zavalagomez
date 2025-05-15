import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MainLayout({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* <Navbar /> */}
      <main style={{ flex: 1, paddingTop: '1rem', paddingRight: '1rem', paddingLeft: '1rem', paddingBottom:'1rem' }}>
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
