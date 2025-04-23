"use client";

import { useEffect, useState } from "react";

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [hasPrompted, setHasPrompted] = useState(false);

  useEffect(() => {
    // Register service worker here 💡
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/serviceWorker.js")
        .then((reg) => console.log("SW registered:", reg))
        .catch((err) => console.error("SW registration failed:", err));
    }

    const prompted = sessionStorage.getItem("pwa-prompted");
    if (prompted) setHasPrompted(true);

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
        setHasPrompted(true);
        sessionStorage.setItem("pwa-prompted", "true");
      });
    }
  };

  if (!deferredPrompt || hasPrompted) return null;

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 z-50 px-4 py-2 bg-orange-500 text-white rounded-md shadow-lg"
    >
      Install PHX-Write
    </button>
  );
}
