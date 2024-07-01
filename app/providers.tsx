'use client'

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { useEffect } from "react";
import { useReportWebVitals } from 'next/web-vitals';




export function Providers({ children, ...props }: ThemeProviderProps) {

  useReportWebVitals((metric) => {
    console.log(metric)
  })
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.ts', { scope: '/docs' })
        .then((registration) => console.log('scope is: ', registration.scope));

    }
  }, []);


  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}