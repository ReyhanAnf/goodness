

import type { Metadata } from "next";
import { Ubuntu } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import Navbar from "@/components/pack/navbar";
import "./manifest.json";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


const ubuntu = Ubuntu({
  weight: "400",
  variable: "--font-basefont",
  subsets: ["latin"],
  preload: true
})

export const metadata: Metadata = {
  title: "Goodness",
  description: "Subhanallah",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  serviceWorkerRegistration.register();


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
