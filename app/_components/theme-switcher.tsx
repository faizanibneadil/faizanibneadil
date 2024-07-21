"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return theme === "light" ? (
    <Sun className="cursor-pointer" onClick={() => setTheme("dark")} />
  ) : (
    <Moon className="cursor-pointer" onClick={() => setTheme("light")} />
  );
}
