import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4">
      <div className="container mx-auto px-4 text-center text-sm">
        <p>LOTUS-HUB © {new Date().getFullYear()} RadReport - Professional Radiology Reporting System</p>
      </div>
    </footer>
  );
};