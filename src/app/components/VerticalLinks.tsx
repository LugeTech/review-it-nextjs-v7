import React from 'react';
import { HomeIcon, MailIcon, PhoneIcon } from 'lucide-react';

const VerticalLinks: React.FC = () => {
  const icons = [
    { Icon: HomeIcon, label: 'Home' },
    { Icon: MailIcon, label: 'Email' },
    { Icon: PhoneIcon, label: 'Phone' },
  ];

  return (
    <div className="flex space-x-2">
      {icons.map(({ Icon, label }) => (
        <button
          key={label}
          className="p-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors duration-200"
          aria-label={label}
        >
          <Icon className="w-5 h-5" />
        </button>
      ))}
    </div>
  );
};

export default VerticalLinks;
