import React from 'react';
import { FiInfo } from 'react-icons/fi';

const Version: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-2 bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-600 shadow-sm hover:bg-gray-200 transition-colors duration-200">
      <FiInfo className="text-gray-500" />
      <span>Version 0.5</span>
    </div>
  );
};

export default Version;
