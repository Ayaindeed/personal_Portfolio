"use client";

import { useState, useEffect } from "react";

interface TerminalProps {
  initialCommands?: string[];
}

export default function Terminal({ initialCommands = [] }: TerminalProps) {
  const [isTyping, setIsTyping] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullWelcomeText = "Welcome to Aya's Portfolio Terminal. Type 'help' for available commands.";
  
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
    help: "Available commands: ls, cd, about, skills, projects, blog, contact, clear, whoami, sudo, rm",
    whoami: "user@arch-portfolio",
    ls: "about/  blog/  projects/  contact/  README.md",
    about: "Full Stack Data Engineer | ETL Pipelines | Analytics",
    skills: "Python • SQL • TypeScript • Apache Airflow • Spark • PostgreSQL • dbt • Docker",
    projects: "View projects: type 'cd projects' or click Projects in taskbar",
    blog: "Read blog posts: type 'cd blog' or click Blog in taskbar",
    contact: "Get in touch: type 'cd contact' or click Contact in taskbar",
    clear: "CLEAR_SCREEN",
    rm: "Usage: rm [options] file...\n\nOptions:\n  -r      remove directories and their contents recursively\n  -f      ignore nonexistent files, never prompt\n\nWARNING: This command can be dangerous. Use with caution.",
    "rm -rf": "DANGER ZONE DETECTED\n\nrm: missing operand\nTry 'rm --help' for more information.\n\nNote: I'm not that kind of terminal. This is a safe space.",
    "rm -rf /": "CRITICAL ERROR\n\nrm: it is dangerous to operate recursively on '/'\nrm: use --no-preserve-root to override this failsafe\n\nComment: Deleting root would be a grave mistake.\nThis incident has been logged.",
    "rm -rf *": "OPERATION BLOCKED\n\nrm: refusing to delete everything in current directory\nrm: use --force-everything flag to override (just kidding)\n\nSuggestion: Try 'rm -rf my_social_life' instead.\nStatus: Already empty anyway.",
    "rm -rf bugs": "DEBUGGING MODE ACTIVATED\n\nrm: cannot remove 'bugs': No such file or directory\nrm: scan complete - 0 bugs found\n\nComment: I wish debugging were this easy.\nReality: Bugs are feature-resistant.",
    "rm -rf problems": "ACCESS CONTROL VIOLATION\n\nrm: cannot remove 'problems': Operation not permitted\nrm: insufficient privileges for life-altering operations\n\nRequired: sudo access to existence\nAlternative: Try meditation or coffee.",
    "rm -rf monday": "FILE SYSTEM ERROR\n\nrm: cannot remove 'monday': Resource busy\nrm: file is currently in use by life.exe\n\nStatus: Monday is read-only and recurring\nWorkaround: None found after extensive testing.",
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    
    // Check for sudo commands
    if (trimmed === "sudo" || trimmed.startsWith("sudo ")) {
      const sudoCmd = trimmed === "sudo" ? "" : trimmed.substring(5);
      const responses = sudoCmd
        ? [
            `AUTHENTICATION REQUIRED\n\n[sudo] password for aya:\n\nPERMISSION DENIED\n\nSorry, you don't have permission to execute '${sudoCmd}'.\nThis incident will be reported to system administrator.\n\nReason: Insufficient privileges\nAction: Request denied`,
            `PRIVILEGE ESCALATION BLOCKED\n\n[sudo] password for aya:\n\nACCESS VIOLATION\n\nNice try! Command '${sudoCmd}' requires root access.\nUnauthorized attempt has been logged.\n\nStatus: Security breach detected\nResponse: Incident escalated`,
            `AUTHORIZATION FAILURE\n\n[sudo] password for aya:\n\nSECURITY ALERT\n\nAccess denied for '${sudoCmd}' - above your clearance level.\nAdministrator notification sent.\n\nClassification: Restricted operation\nOutcome: Request terminated`,
          ]
        : [
            `INCOMPLETE COMMAND\n\n[sudo] password for aya:\n\nSYNTAX ERROR\n\nWhat do you want to sudo? Try 'sudo <command>'.\nEmpty sudo attempt logged for security review.\n\nFormat: sudo [command]\nStatus: Command required`,
          ];
      const output = responses[Math.floor(Math.random() * responses.length)];
      setHistory((prev) => [...prev, `aya@arch-portfolio:~$ ${cmd}`, output, ""]);
      setInput("");
      setCommandIndex(-1);
      return;
    }

    // Check for rm -rf variations with responses
    if (trimmed.startsWith("rm -rf")) {
      const target = trimmed.substring(6).trim();
      const rmResponses = [
        `OPERATION DENIED\n\nrm: cannot remove '${target || "target"}': Access denied\nrm: ${target || "target"} is protected by system safeguards\n\nComment: I have particular skills, but destruction isn't one.\nSuggestion: Try a different approach.`,
        `SECURITY VIOLATION\n\nrm: '${target || "target"}' is write-protected\nrm: removal blocked by safety protocols\n\nStatus: ${target || "Target"} has plot armor\nAction: Operation cancelled for your protection.`,
        `SIMULATION MODE\n\nrm: simulating deletion of '${target || "item"}'\n[................] 100% complete\nrm: just kidding - nothing was actually deleted\n\nNote: This is a portfolio, not a file destroyer\nMode: Demonstration only.`,
        `BACKUP DETECTED\n\nrm: cannot delete '${target || "files"}' - redundant copies exist\nrm: located in cloud storage and memory\n\nStatus: ${target || "Data"} is safely preserved\nAction: Deletion request ignored.`,
      ];
      const response = rmResponses[Math.floor(Math.random() * rmResponses.length)];
      setHistory((prev) => [...prev, `aya@arch-portfolio:~$ ${cmd}`, response, ""]);
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
        {history.map((line, idx) => {
          const isCommand = line.startsWith("aya@arch-portfolio:~$");
          const isError = line.includes("DANGER") || line.includes("ERROR") || line.includes("DENIED") || line.includes("BLOCKED");
          const isWarning = line.includes("WARNING") || line.includes("VIOLATION") || line.includes("ALERT") || line.includes("AUTHENTICATION REQUIRED") || line.includes("PRIVILEGE ESCALATION");
          const isNeofetch = line.includes("neofetch");
          const isSudo = line.includes("[sudo] password for aya:");
          
          let className = "text-arch-text whitespace-pre";
          if (isCommand) {
            className = "text-arch-accent whitespace-pre font-bold";
          } else if (isError) {
            className = "text-red-400 whitespace-pre";
          } else if (isWarning || isSudo) {
            className = "text-yellow-400 whitespace-pre";
          } else if (isNeofetch) {
            className = "text-arch-accent whitespace-pre";
          }
          
          return (
            <pre key={`line-${idx}`} className={className}>
              {line}
            </pre>
          );
        })}
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
