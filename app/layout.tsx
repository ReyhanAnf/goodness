

import type { Metadata } from "next";
import { Poppins } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import Navbar from "@/components/pack/navbar";



const poppins = Poppins({
  weight: "400",
  variable: "--font-sans",
  subsets: ["latin"],
  preload: true
})

export const metadata: Metadata = {
  title: "Undertable",
  description: "Share your homework",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-slate-200/90 dark:bg-black dark:from-black dark:to-slate-900 font-sans antialiased w-full",
        poppins.variable
      )}>
        <Providers>
          {children}
          <Navbar />
        </Providers>

      </body>
    </html>
  );
}
