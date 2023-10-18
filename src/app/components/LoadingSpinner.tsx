import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-1 justify-center items-center text-center ">
      <div className='className="w-16 h-16 flex justify-center items-center' role="status">
        <PropagateLoader size={10} color="#d5d5d5" />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
