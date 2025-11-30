"use client";

import { useState, useEffect } from "react";

export default function Taskbar() {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(new Date().toLocaleTimeString());
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-arch-dark border-t-2 border-arch-blue h-12 flex items-center justify-between px-4 z-40">
      <div className="text-xs font-mono text-arch-text flex items-center gap-3">
        <span className="text-arch-accent">$ cat /dev/motto</span>
        <span className="text-arch-border">|</span>
        <span>A shadow lingering in the pipeline</span>
      </div>
      <div className="terminal-text text-xs font-mono text-arch-accent">{mounted ? time : "--:--:--"}</div>
    </div>
  );
}
