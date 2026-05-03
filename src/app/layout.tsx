import type { Metadata } from "next";
import { ThemeProvider } from "@wrksz/themes/next";
import "./globals.css";
import Providers from "./providers";

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
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="theme"
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
