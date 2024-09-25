"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const InstallPWA: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const checkInstallState = () => {
      setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
    };

    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handler as EventListener);
    window.addEventListener('appinstalled', () => {
      setIsInstallable(false);
      setIsStandalone(true);
    });

    // Check initial state
    checkInstallState();

    // Set up a listener for changes in display mode
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    mediaQuery.addEventListener('change', checkInstallState);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler as EventListener);
      mediaQuery.removeEventListener('change', checkInstallState);
    };
  }, []);

  const handleInstallClick = useCallback(async () => {
    if (!deferredPrompt) return;

    setIsInstallable(false);
    deferredPrompt.prompt();

    try {
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
        setIsStandalone(true);
      } else {
        console.log("User dismissed the install prompt");
        setIsInstallable(true);
      }
    } catch (error) {
      console.error("Failed to show prompt:", error);
      setIsInstallable(true);
    } finally {
      setDeferredPrompt(null);
    }
  }, [deferredPrompt]);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
        {isInstallable && !isStandalone ? (
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
        ) : isStandalone ? (
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
        ) : (
          <>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Welcome to Our Web App
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Enjoy our app! Installation option may appear soon if your browser supports it.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default InstallPWA;
