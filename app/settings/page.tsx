"use client";

import { Toggle } from "@/components/ui/toggle";
import { Moon } from "lucide-react";
import { useDarkMode } from "@/components/Providers/DarkModeProvider";

export default function Settings() {
  const { dark, toggle } = useDarkMode();

  return (
    <main className="p-4">
      <Toggle pressed={dark} onPressedChange={toggle}>
        <Moon />
        Dark Mode
      </Toggle>
    </main>
  );
}
