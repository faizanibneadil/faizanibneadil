"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { Suspense } from "react";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <Suspense fallback={null}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>;
    </Suspense>
  )
}
