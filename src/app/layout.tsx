import type { Metadata } from "next";
import { ThemeProvider } from "@wrksz/themes/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Counter Showcase",
  description: "HeroUI v3 counter demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="theme"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
