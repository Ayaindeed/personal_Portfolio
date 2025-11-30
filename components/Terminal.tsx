"use client";

import { useState, useEffect } from "react";

interface TerminalProps {
  initialCommands?: string[];
}

export default function Terminal({ initialCommands = [] }: TerminalProps) {
  const [isTyping, setIsTyping] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullWelcomeText = "Welcome to Arch Portfolio Terminal. Type 'help' for available commands.";
  
  useEffect(() => {
    if (!isTyping) return;
    
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullWelcomeText.length) {
        setTypedText(fullWelcomeText.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 50);
    
    return () => clearInterval(typingInterval);
  }, []);
  
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);

  const logoAndInfo = `aya@arch-portfolio ~ $ neofetch

                   -'                     aya@arch-portfolio
                  .o+'                    -------------------
                 'ooo/                    OS: Arch Linux
                '+oooo:                   Kernel: Rolling Release
               '+oooooo:                  Uptime: Always Learning
              -+oooooo+:                  Packages: 50+ Technologies
            '/:--:++oooo+:                Shell: Full-Stack Data
           '/++++/+++++++:                Terminal: Portfolio
          '/++++++++++++++:               CPU: Data Engineering & Science
         '/+++oooooooooooo/'              GPU: Cloud Architecture
        ./oooossso++ossssso+'             Memory: 100% Passion Driven
       .oossssso-    -/osssssso.
      :osssssss/      ossssso+++.
     /ossssssss/        +ssssooo/-
    /ossssso+/:-       -:/+osssso+-
   '+sso+:-'                '.-/+oso:
  '++:.                         '.-/+/
  .'                                 '/
`;

  const [history, setHistory] = useState<string[]>([logoAndInfo]);
  const [input, setInput] = useState("");
  const [commandIndex, setCommandIndex] = useState(-1);

  const commands: { [key: string]: string } = {
    help: "Available commands: ls, cd, about, skills, projects, blog, contact, clear, whoami, sudo",
    whoami: "user@arch-portfolio",
    ls: "about/  blog/  projects/  contact/  README.md",
    about: "Full Stack Data Engineer | ETL Pipelines | Analytics",
    skills: "Python • SQL • TypeScript • Apache Airflow • Spark • PostgreSQL • dbt • Docker",
    projects: "View projects: type 'cd projects' or click Projects in taskbar",
    blog: "Read blog posts: type 'cd blog' or click Blog in taskbar",
    contact: "Get in touch: type 'cd contact' or click Contact in taskbar",
    clear: "CLEAR_SCREEN",
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    
    // Check for sudo commands
    if (trimmed === "sudo" || trimmed.startsWith("sudo ")) {
      const sudoCmd = trimmed === "sudo" ? "" : trimmed.substring(5);
      const responses = sudoCmd
        ? [
            `[sudo] password for aya:\nSorry, you don't have permission to ${sudoCmd}.\nThis incident will be reported. ☕`,
            `[sudo] password for aya:\nNice try! But ${sudoCmd} requires root access.\nIncident logged. 🚨`,
            `[sudo] password for aya:\nAccess denied. ${sudoCmd} is above your pay grade.\nAdministrator has been notified. 🔒`,
          ]
        : [
            `[sudo] password for aya:\nWhat do you want to sudo? Try 'sudo <command>'.\nIncident logged anyway. 🚨`,
          ];
      const output = responses[Math.floor(Math.random() * responses.length)];
      setHistory((prev) => [...prev, `aya@arch-portfolio:~$ ${cmd}`, output, ""]);
      setInput("");
      setCommandIndex(-1);
      return;
    }
    
    const output = commands[trimmed] || `command not found: ${trimmed}`;

    if (trimmed === "clear") {
      setHistory([]);
    } else {
      setHistory((prev) => [...prev, `aya@arch-portfolio:~$ ${cmd}`, output, ""]);
    }

    setInput("");
    setCommandIndex(-1);
  };

  return (
    <div className="w-full h-[500px] bg-terminal border-2 border-arch-blue rounded font-mono text-xs text-arch-text overflow-hidden flex flex-col">
      {/* Terminal output */}
      <div className="flex-1 overflow-y-auto p-4">
        {history.length === 0 && (
          <div className="text-arch-accent mb-4">
            {typedText}
            {isTyping && showCursor && <span className="text-arch-blue">█</span>}
          </div>
        )}
        {history.map((line, idx) => (
          <pre
            key={`line-${idx}`}
            className={line.includes("neofetch") ? "text-arch-accent whitespace-pre" : "text-arch-text whitespace-pre"}
          >
            {line}
          </pre>
        ))}
      </div>

      {/* Terminal input */}
      <div className="border-t border-arch-border p-2 flex items-center">
        <span className="text-arch-accent mr-2">aya@arch-portfolio:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCommand(input);
            }
          }}
          className="flex-1 bg-transparent outline-none text-arch-text"
          autoFocus
          placeholder="type 'help' to get started..."
        />
      </div>
    </div>
  );
}
