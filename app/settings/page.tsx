"use client";

import { useDarkMode } from "@/components/Providers/DarkModeProvider";
import { useMDNotes } from "@/components/Providers/MDNotesProvider";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Settings() {
  const { dark, toggle } = useDarkMode();
  const {enabled, toggle: toggleMDNotes} = useMDNotes();

  return (
    <main className="p-4 w-full">
      <h1 className="text-3xl">
        Settings
      </h1>
      <div className="mt-8 max-w-sm flex flex-col gap-3 w-full">
        
        <div className="flex items-center w-full justify-between">
          <Label htmlFor="darkMode">Dark Mode</Label>
          <Switch checked={dark} onCheckedChange={toggle} id="darkMode" />
        </div>

        <div className="flex items-center w-full justify-between">
          <Label htmlFor="mdNotes">Markdown Notes</Label>
          <Switch checked={enabled} onCheckedChange={toggleMDNotes} />
        </div>
      </div>

    </main>
  );
}
