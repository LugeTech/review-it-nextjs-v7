"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

const InstallPWA: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = useCallback(async () => {
    if (!deferredPrompt) return;

    setIsVisible(false);
    deferredPrompt.prompt();

    try {
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
    } catch (error) {
      console.error("Failed to show prompt:", error);
    } finally {
      setDeferredPrompt(null);
    }
  }, [deferredPrompt]);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
        {isVisible ? (
          <>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Experience the Future of Web Apps
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our Progressive Web App (PWA) delivers lightning-fast performance, offline capabilities, and seamless installation - all without the hassle of traditional app stores.
              </p>
            </div>
            <Button
              size="lg"
              className="bg-gray-900 text-gray-50 hover:bg-gray-900/90"
              onClick={handleInstallClick}
            >
              Install Now
            </Button>
          </>
        ) : (
          <>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                PWA Installed!
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Thank you for installing our Progressive Web App!<br />
                Go Review something.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default InstallPWA;
