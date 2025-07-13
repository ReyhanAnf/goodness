

import type { Metadata, Viewport } from "next";
import { Ubuntu } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import Navbar from "@/components/pack/navbar";
import OfflineNotification from "@/components/pack/offline-notification";
import ServiceWorkerRegister from "@/components/pack/service-worker-register";


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
  authors: [
    {
      name: "reyhananf",
      url: "https://www.linkedin.com/in/reyhan-andrea-firdaus/",
    },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon128.png" },
    { rel: "icon", url: "icons/icon128.png" },
  ],
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  viewportFit: 'cover',
}

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
          <ServiceWorkerRegister />
          <OfflineNotification />
          {children}
          <Navbar />
        </Providers>

      </body>
    </html>
  );
}
