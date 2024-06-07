"use client";
import React, { useState, useEffect } from "react";

const InstallPWA: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    setIsVisible(false);
    (deferredPrompt as any).prompt();
    const { outcome } = await (deferredPrompt as any).userChoice;
    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }
    setDeferredPrompt(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {isVisible ? (
        <>
          <h1 className="text-3xl font-bold mb-4">Install Our App</h1>
          <p className="text-lg mb-6">
            Get the full experience by installing our Progressive Web App!
          </p>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4">PWA Installed!</h1>
          <p className="text-lg mb-6">
            Thank you for installing our Progressive Web App!
            <br />
            Go Review something.
          </p>
        </>
      )}
      {isVisible && (
        <button
          onClick={handleInstallClick}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
        >
          Install App
        </button>
      )}
    </div>
  );
};

export default InstallPWA;
