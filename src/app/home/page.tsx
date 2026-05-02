"use client";

import { Button, Card } from "@heroui/react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function HomePage() {
  const [count, setCount] = useState(0);
  const [isPending, setIsPending] = useState(false);

  const handleIncrement = () => setCount((prev) => prev + 1);

  const handleDecrement = () => {
    setIsPending(true);
    setTimeout(() => {
      setCount((prev) => prev - 1);
      setIsPending(false);
    }, 300);
  };

  const handleReset = () => setCount(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header with Theme Toggle */}
        <div className="text-center mb-12 relative">
          <div className="absolute right-0 top-0">
            <ThemeToggle />
          </div>
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Counter Showcase
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Interactive counter with HeroUI components
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Counter Card */}
          <Card.Root className="w-full">
            <Card.Header className="flex flex-col items-center gap-2 pb-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 flex items-center justify-center">
                <span className="text-3xl">🔢</span>
              </div>
              <Card.Title className="text-2xl font-bold text-center text-slate-800 dark:text-slate-100">
                Live Counter
              </Card.Title>
              <Card.Description className="text-small text-slate-500 dark:text-slate-400 text-center">
                Click the buttons to adjust the value
              </Card.Description>
            </Card.Header>

            <Card className="flex flex-col items-center gap-6">
              <div className="text-center">
                <div
                  className={`text-8xl font-bold mb-2 transition-all duration-300 ${
                    count > 0
                      ? "text-green-600 dark:text-green-400"
                      : count < 0
                        ? "text-red-600 dark:text-red-400"
                        : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {count}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {count > 0
                    ? "Positive number"
                    : count < 0
                      ? "Negative number"
                      : "Zero"}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  variant="danger"
                  onPress={handleDecrement}
                  isPending={isPending}
                  size="lg"
                >
                  {isPending ? "..." : "-1"}
                </Button>
                <Button variant="secondary" onPress={handleReset} size="lg">
                  Reset
                </Button>
                <Button variant="primary" onPress={handleIncrement} size="lg">
                  +1
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 justify-center pt-2 border-t border-slate-200 dark:border-slate-700 w-full">
                <Button
                  size="sm"
                  variant="outline"
                  onPress={() => setCount(10)}
                >
                  +10
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onPress={() => setCount(-10)}
                >
                  -10
                </Button>
                <Button size="sm" variant="ghost" onPress={() => setCount(50)}>
                  +50
                </Button>
                <Button size="sm" variant="ghost" onPress={() => setCount(-50)}>
                  -50
                </Button>
              </div>
            </Card>
          </Card.Root>

          {/* Information Card */}
          <Card.Root className="w-full">
            <Card.Header className="flex flex-col items-center gap-2 pb-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400 flex items-center justify-center">
                <span className="text-3xl">✨</span>
              </div>
              <Card.Title className="text-2xl font-bold text-center text-slate-800 dark:text-slate-100">
                Features
              </Card.Title>
              <Card.Description className="text-small text-slate-500 dark:text-slate-400 text-center">
                What makes this counter special
              </Card.Description>
            </Card.Header>

            <Card className="flex flex-col gap-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 dark:bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400">🎨</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                    Beautiful Design
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Gradient colors and smooth animations
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 dark:bg-purple-400/20 flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-400">
                    ⚡
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                    Loading States
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Visual feedback on actions
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 dark:bg-orange-400/20 flex items-center justify-center">
                  <span className="text-orange-600 dark:text-orange-400">
                    🎯
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                    Quick Jumps
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Skip to common values instantly
                  </p>
                </div>
              </div>
            </Card>
          </Card.Root>
        </div>

        {/* Action Bar */}
        <div className="mt-8">
          <Card.Root>
            <Card className="flex flex-row items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💡</span>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    Try the counter!
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Click +1, -1, or use the jump buttons
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onPress={() => setCount((prev) => prev + 5)}
                >
                  +5
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onPress={() => setCount((prev) => prev - 5)}
                >
                  -5
                </Button>
                <Button variant="danger" size="sm" onPress={handleReset}>
                  Reset All
                </Button>
              </div>
            </Card>
          </Card.Root>
        </div>

        <footer className="mt-12 pt-6 text-center border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Built with HeroUI v3 • Next.js 16 • React 19 • Tailwind CSS v4
          </p>
        </footer>
      </div>
    </div>
  );
}
