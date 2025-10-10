"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ArrowLeft } from "lucide-react";

const InitMDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export type Docs = {
  id: string;
  title: string;
  content: string;
  createdAt: number;
};

export default function MDEditor({
  close,
  saveDocs,
  targetDoc,
}: {
  close: () => void;
  saveDocs: (doc: Docs) => void;
  targetDoc: Docs | null;
}) {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const skipNextChange = useRef(false);

  useEffect(() => {
    if (targetDoc) {
      setTitle(targetDoc.title);
      setValue(targetDoc.content);
      skipNextChange.current = true;
    } else {
      setTitle("");
      setValue("");
    }
  }, [targetDoc]);

  const handleChange = (val?: string) => {
    if (skipNextChange.current) {
      skipNextChange.current = false;
      return;
    }
    setValue(val || "");
  };

  const handleSave = () => {
    const now = Date.now();

    if (targetDoc) {
      const updated: Docs = {
        ...targetDoc,
        title: title.trim() || "Untitled Document",
        content: value,
        createdAt: now,
      };
      saveDocs(updated);
    } else {
      const newDoc: Docs = {
        id: uuid(),
        title: title.trim() || "Untitled Document",
        content: value,
        createdAt: now,
      };
      saveDocs(newDoc);
    }

    setValue("");
    setTitle("");
    close();
  };

  return (
    <div className="w-full">
      <nav className="w-full flex p-4 justify-between items-center border-b border-border">
        <div className="flex gap-4 items-center">
          <Button variant="outline" size="icon" onClick={close}>
            <ArrowLeft />
          </Button>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-fit"
            placeholder="New Document"
          />
        </div>

        <Button onClick={handleSave} variant="default">
          Save
        </Button>
      </nav>

      <InitMDEditor
        value={value}
        onChange={handleChange}
        className="!h-screen"
      />
    </div>
  );
}
