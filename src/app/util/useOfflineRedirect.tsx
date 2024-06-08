"use client";
// src/hooks/useOfflineRedirect.tsx
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useOfflineRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const handleOffline = () => {
      router.push("/offline");
    };

    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("offline", handleOffline);
    };
  }, [router]);
};

export default useOfflineRedirect;
