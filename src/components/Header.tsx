import React from 'react';
import { Stethoscope } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Stethoscope className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-800">RadReport</h1>
        </div>
        <div className="text-sm text-gray-600">
          Radiology Reporting System
        </div>
      </div>
    </header>
  );
};