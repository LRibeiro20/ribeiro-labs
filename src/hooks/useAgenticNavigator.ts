"use client";

import { useEffect } from "react";

export function useAgenticNavigator() {
  const navigateTo = (target: string) => {
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const processAction = (actionStr?: string) => {
    if (!actionStr) return;
    try {
      const parsed = JSON.parse(actionStr);
      if (parsed.action === "navigate" && parsed.target) {
        navigateTo(parsed.target);
      }
    } catch (e) {
      console.error("Failed to parse agent action", e);
    }
  };

  return { navigateTo, processAction };
}
