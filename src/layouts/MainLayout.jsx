import React from 'react';

export default function MainLayout({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: 1, minHeight: '100vh' }}>
        {children}
      </main>
    </div>
  );
}
