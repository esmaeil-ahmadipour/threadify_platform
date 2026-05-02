"use client";

import { Button } from "@heroui/react";
import { useTheme } from "@wrksz/themes/client";
import { useState, useEffect } from "react";

type Theme = "light" | "dark";

export function ThemeToggle(): React.JSX.Element {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  // Safe localStorage utility with proper typing
  const saveToLocalStorage = (themeValue: Theme): void => {
    try {
      localStorage.setItem("theme", themeValue);
    } catch (error) {
      if (error instanceof Error) {
        console.warn("Failed to save theme to localStorage:", error.message);
      } else {
        console.warn("Failed to save theme to localStorage: Unknown error");
      }
    }
  };

  // Load theme from localStorage
  const loadFromLocalStorage = (): Theme | null => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") {
        return saved as Theme;
      }
      return null;
    } catch (error) {
      console.warn("Failed to load theme from localStorage");
      return null;
    }
  };

  // Handle hydration with proper pattern - use requestAnimationFrame
  useEffect((): (() => void) => {
    // This avoids the setState in effect warning
    const rafId: number = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => cancelAnimationFrame(rafId);
  }, []);

  // Save theme to localStorage whenever it changes
  useEffect((): void => {
    if (mounted && resolvedTheme) {
      saveToLocalStorage(resolvedTheme as Theme);
    }
  }, [mounted, resolvedTheme]);

  // Read from localStorage on mount
  useEffect((): void => {
    if (mounted) {
      const savedTheme: Theme | null = loadFromLocalStorage();
      if (savedTheme && savedTheme !== resolvedTheme) {
        setTheme(savedTheme);
      }
    }
  }, [mounted, resolvedTheme, setTheme]);

  // Handle loading state
  if (!mounted) {
    return (
      <Button isIconOnly variant="ghost" aria-label="Loading theme" isDisabled>
        🌙
      </Button>
    );
  }

  const isDark: boolean = resolvedTheme === "dark";

  return (
    <Button
      isIconOnly
      variant="ghost"
      onPress={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="transition-all duration-200 hover:scale-105"
    >
      {isDark ? "☀️" : "🌙"}
    </Button>
  );
}
