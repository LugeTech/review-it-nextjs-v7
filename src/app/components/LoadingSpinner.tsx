import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col h-screen w-full gap-2 justify-center items-center text-center ">
      <div className='className="w-full h-full flex justify-center items-center' role="status">
        <PulseLoader color="green" loading={true} />
      </div>
      {/* <div className="w-full h-full flex justify-center items-center" role="status"> */}
      {/* <p className="text-gray-400 animate-pulse">Loading...</p> */}
      {/* </div> */}
    </div>
  );
};

export default LoadingSpinner;
