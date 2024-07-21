"use client";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: React.PropsWithChildren) {
  return <ThemeProvider enableSystem>{children}</ThemeProvider>;
}
