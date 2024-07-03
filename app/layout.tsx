

import type { Metadata } from "next";
import { Ubuntu } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import Navbar from "@/components/pack/navbar";


const ubuntu = Ubuntu({
  weight: "400",
  variable: "--font-basefont",
  subsets: ["latin"],
  preload: true
})

export const metadata: Metadata = {
  title: "Muslim Goodness",
  description: "The Muslim App for daily goodness",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    {
      name: "reyhananf",
      url: "https://www.linkedin.com/in/reyhan-andrea-firdaus/",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon128.png" },
    { rel: "icon", url: "icons/icon128.png" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen w-full sm:mx-auto sm:w-[400px] bg-slate-200/90 dark:bg-black dark:from-black dark:to-slate-900 font-sans antialiased basefont",
        ubuntu.className
      )}>
        <Providers>
          {children}
          <Navbar />
        </Providers>

      </body>
    </html>
  );
}
