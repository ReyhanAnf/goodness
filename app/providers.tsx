"use client"

import { ThemeProvider } from "next-themes"
import { ReactNode } from "react"
import { Toaster } from "sonner"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster 
        position="top-center"
        richColors
        closeButton
        duration={3000}
      />
    </ThemeProvider>
  )
}