"use client";
import { useEffect } from "react";
import OneSignal from "react-onesignal";

const OneSignalInit = () => {
  const oneSignalId = process.env.NEXT_PUBLIC_ONESIGNAL_APPID || "";
  console.log("oneSignalId", oneSignalId);
  useEffect(() => {
    if (typeof window !== "undefined") {
      OneSignal.init({
        appId: oneSignalId,
        notifyButton: {
          enable: true,
        },
        allowLocalhostAsSecureOrigin: true, // Enable this for localhost testing
      }).then(() => {
        console.log("OneSignal initialized successfully.");
      }).catch((error) => {
        console.error("OneSignal initialization failed:", error);
      });
    }
  }, []);

  return null; // This component does not render anything
};

export default OneSignalInit;
