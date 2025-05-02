import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  return (
    <h2 className="text-lg font-medium text-gray-800 mb-3 pb-2 border-b border-gray-200">
      {children}
    </h2>
  );
};