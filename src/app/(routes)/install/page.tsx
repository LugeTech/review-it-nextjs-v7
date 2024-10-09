"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const InstallPWA: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const checkStandaloneMode = () => {
      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as any).standalone ||
        document.referrer.includes("android-app://");

      setIsStandalone(isStandalone);
    };

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as EventListener,
    );

    // Check initial state
    checkStandaloneMode();

    // Set up a listener for changes in display mode
    const mediaQuery = window.matchMedia("(display-mode: standalone)");
    mediaQuery.addListener(checkStandaloneMode);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener,
      );
      mediaQuery.removeListener(checkStandaloneMode);
    };
  }, []);

  const handleInstallClick = useCallback(async () => {
    if (!deferredPrompt) {
      console.log("Installation prompt not available");
      return;
    }

    try {
      await deferredPrompt.prompt();
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
    <section className="flex justify-center w-full h-screen py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
        {!isStandalone ? (
          <>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Experience Our Web App as a PWA
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Install our Progressive Web App for a faster, more responsive
                experience - with offline capabilities and easy access from your
                home screen.
              </p>
            </div>
            {deferredPrompt && (
              <Button
                size="lg"
                className="bg-gray-900 text-gray-50 hover:bg-gray-900/90"
                onClick={handleInstallClick}
              >
                Install Now
              </Button>
            )}
          </>
        ) : (
          <>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Welcome to Our PWA!
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                You're using the installed version of our app. Enjoy the
                enhanced experience!
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default InstallPWA;
