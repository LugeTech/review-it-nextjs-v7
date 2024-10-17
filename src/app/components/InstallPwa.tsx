"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useRouter } from "next/navigation";

export default function InstallPwa() {
  const router = useRouter();
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const checkStandaloneMode = () => {
      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as any).standalone ||
        document.referrer.includes("android-app://");

      setIsStandalone(isStandalone);
    };

    // Check initial state
    checkStandaloneMode();

    // Set up a listener for changes in display mode
    const mediaQuery = window.matchMedia("(display-mode: standalone)");
    mediaQuery.addListener(checkStandaloneMode);

    return () => {
      mediaQuery.removeListener(checkStandaloneMode);
    };
  }, []);

  if (isStandalone) {
    return null; // Don't render anything if the app is running as a PWA
  }

  return (
    <section className="w-full py-6 md:py-12 lg:py-12 bg-gradient-to-r from-myTheme-reviewBlue to-myTheme-accent">
      <div className="w-full px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
              Install Our App
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Get instant access to our features, faster load times, and a
              seamless mobile experience.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <Button
              onClick={() => {
                router.push("/install");
              }}
              className="w-full bg-white text-purple-600 hover:bg-gray-100"
              size="lg"
            >
              <Download className="mr-2 h-4 w-4" />
              Install Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
