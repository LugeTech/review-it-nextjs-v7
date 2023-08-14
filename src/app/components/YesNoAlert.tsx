import React, { useState } from 'react';

interface YesNoAlertProps {
  message: string;
}

const YesNoAlert: React.FC<YesNoAlertProps> = ({ message }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleYesClick = () => {
    setIsOpen(false);
    alert("You clicked 'Yes'. push to review page");
  };

  const handleNoClick = () => {
    setIsOpen(false);
    alert("You clicked 'No'. do nothing");
  };

  return (
    <div className="relative">
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 shadow-lg">
          <div className="bg-white p-4 rounded shadow-md justify-center items-center flex flex-col">
            <p className="mb-2">{message}</p>
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={handleYesClick}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Yes
              </button>
              <button
                onClick={handleNoClick}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YesNoAlert;
