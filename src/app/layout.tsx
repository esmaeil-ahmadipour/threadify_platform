import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/header/Header";

export const metadata: Metadata = {
  title: "Threadify",
  description: "HeroUI v3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="container mx-auto px-4 max-w-6xl">
          <Providers>
            <Header />
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}
