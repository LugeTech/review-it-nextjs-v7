"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Assuming you have these components

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const InstallPWA: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [installError, setInstallError] = useState<string | null>(null);
  const [installSuccess, setInstallSuccess] = useState(false);
  const [platform, setPlatform] = useState<string>("");

  const isIos = useCallback(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  }, []);

  const isInStandaloneMode = useCallback(() => {
    return (
      (window.matchMedia &&
        window.matchMedia("(display-mode: standalone)").matches) ||
      (navigator as any).standalone === true || // For iOS Safari
      document.referrer.includes("android-app://") ||
      window.location.search.includes("standalone=true")
    );
  }, []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent | Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
      if ("platforms" in e) {
        setPlatform((e as BeforeInstallPromptEvent).platforms.join(", "));
        console.log("Supported platforms:", platform);
      }
    };

    const handleAppInstalled = () => {
      console.log("PWA was installed");
      setIsStandalone(true);
      setInstallSuccess(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    // Check initial state
    setIsStandalone(isInStandaloneMode());

    const mediaQuery = window.matchMedia("(display-mode: standalone)");
    const handleMediaQueryChange = () => {
      setIsStandalone(isInStandaloneMode());
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, [isInStandaloneMode, platform]);

  const handleInstallClick = useCallback(async () => {
    if (isIos()) {
      // iOS-specific instructions
      setInstallError(
        "To install this app on your iOS device, tap the share icon and select 'Add to Home Screen'.",
      );
      return;
    }

    if (!deferredPrompt) {
      setInstallError("Installation prompt not available");
      return;
    }

    setIsInstalling(true);
    setInstallError(null);

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
        setInstallSuccess(true);
      } else {
        console.log("User dismissed the install prompt");
      }
    } catch (error) {
      console.error("Failed to show prompt:", error);
      setInstallError("Failed to install the app. Please try again later.");
    } finally {
      setIsInstalling(false);
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  }, [deferredPrompt, isIos]);

  return (
    <section className="flex justify-center w-full min-h-screen py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
        {!isStandalone ? (
          <>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Experience Our Web App as a PWA
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl lg:text-base xl:text-xl">
                Install our Progressive Web App for a faster, more responsive
                experience—with offline capabilities and easy access from your
                home screen.
              </p>
            </div>
            {isIos() && !isInStandaloneMode() && (
              <p className="text-blue-600">
                To install this app, tap the share icon{" "}
                <svg
                  className="inline w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                >
                  <path d="M336 64h56a56 56 0 0156 56v280a56 56 0 01-56 56H120a56 56 0 01-56-56V120a56 56 0 0156-56h56" />
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="40"
                    d="M256 48v240"
                  />
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="40"
                    d="M384 176L256 48 128 176"
                  />
                </svg>{" "}
                and select `&quot;`Add to Home Screen`&quot;`.
              </p>
            )}
            {isInstallable && !isIos() && (
              <Button
                size="lg"
                className="bg-gray-900 text-gray-50 hover:bg-gray-900/90 disabled:opacity-50"
                onClick={handleInstallClick}
                disabled={isInstalling}
                aria-label="Install Progressive Web App"
              >
                {isInstalling ? "Installing..." : "Install Now"}
              </Button>
            )}
            {!isInstallable && !isIos() && (
              <p className="text-yellow-600">
                PWA installation is not supported in your current browser or the
                app is already installed.
              </p>
            )}
            {installError && (
              <Alert variant="destructive">
                <AlertTitle>Installation Error</AlertTitle>
                <AlertDescription>{installError}</AlertDescription>
              </Alert>
            )}
            {installSuccess && (
              <Alert>
                <AlertTitle>Installation Successful</AlertTitle>
                <AlertDescription>
                  The app has been successfully installed. You can now access it
                  from your home screen.
                </AlertDescription>
              </Alert>
            )}
          </>
        ) : (
          <>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Welcome to Our PWA!
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl lg:text-base xl:text-xl">
                You are using the installed version of our app. Enjoy the
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
