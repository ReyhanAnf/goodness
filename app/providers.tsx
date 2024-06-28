'use client'

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { getCookies } from "cookies-next";



export function Providers({ children, ...props }: ThemeProviderProps) {
  let hour = getCookies()


  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={parseInt(hour.hour ? hour.hour : "0") >= 6 && parseInt(hour.hour ? hour.hour : "0") <= 18 ? "light" : "dark"}
      enableSystem
      disableTransitionOnChange >
      {children}
    </NextThemesProvider>
  )
}