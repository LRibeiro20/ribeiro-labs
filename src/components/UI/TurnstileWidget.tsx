"use client";

import { useEffect, useState } from "react";

export default function TurnstileWidget() {
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    // Define the global callback function that Turnstile will call upon success
    (window as any).onTurnstileSuccess = async (token: string) => {
      try {
        const res = await fetch("/api/verify-turnstile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        
        if (res.ok) {
          // If successful, the server set an HTTP-only cookie. We can hide the widget.
          setVerified(true);
        } else {
          console.error("Turnstile backend verification failed.");
        }
      } catch (err) {
        console.error("Error verifying turnstile token", err);
      }
    };
  }, []);

  return (
    <div className={`fixed bottom-4 left-4 z-50 transition-opacity duration-500 ${verified ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div 
        className="cf-turnstile" 
        data-sitekey={process.env.NODE_ENV === "development" ? "1x00000000000000000000AA" : "0x4AAAAAADPI-Wjv7rpZxhog"}
        data-callback="onTurnstileSuccess"
      ></div>
    </div>
  );
}
