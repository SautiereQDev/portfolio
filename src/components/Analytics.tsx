import { useEffect } from "react";

// Types pour Google Analytics
type GTagCommand = "js" | "config" | "event" | "set" | "consent";
type GTagEvent = [GTagCommand, ...unknown[]];

declare global {
  interface Window {
    dataLayer: GTagEvent[];
  }
}

export function Analytics() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GOOGLE_ANALYTICS_TRACKING_ID}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];

    function gtag(command: GTagCommand, ...args: unknown[]) {
      window.dataLayer.push([command, ...args] as GTagEvent);
    }

    gtag("js", new Date());

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
