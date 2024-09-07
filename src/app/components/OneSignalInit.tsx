
// app/OneSignalInit.tsx
"use client"; // This is a client component

import { useEffect } from "react";
import OneSignal from "react-onesignal";

const OneSignalInit = () => {
  useEffect(() => {
    // Ensure this code runs only on the client side
    if (typeof window !== "undefined") {
      OneSignal.init({
        appId: "YOUR_APP_ID", // Replace with your OneSignal App ID
        notifyButton: {
          enable: true,
        },
        // Uncomment the below line to run on localhost
        allowLocalhostAsSecureOrigin: true
      });
    }
  }, []);

  return null; // This component does not render anything
};

export default OneSignalInit;
