"use client";

import Navbar from "@/components/Navbar";
import Taskbar from "@/components/Taskbar";
import ShellPanel from "@/components/ShellPanel";
import ShellCard from "@/components/ShellCard";
import { useState, useRef, useEffect } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(0); // 0: name, 1: email, 2: message, 3: success
  const [currentInput, setCurrentInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step === 0) {
      setHistory(["$ contact --send", "Enter your name:"]);
    }
    inputRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleTerminalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentInput.trim()) return;

    const newHistory = [...history, `> ${currentInput}`];

    if (step === 0) {
      setFormData(prev => ({ ...prev, name: currentInput }));
      newHistory.push("Enter your email:");
      setHistory(newHistory);
      setStep(1);
    } else if (step === 1) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(currentInput)) {
        newHistory.push("[ERROR] Invalid email format. Try again:");
        setHistory(newHistory);
        setCurrentInput("");
        return;
      }
      setFormData(prev => ({ ...prev, email: currentInput }));
      newHistory.push("Enter your message:");
      setHistory(newHistory);
      setStep(2);
    } else if (step === 2) {
      setFormData(prev => ({ ...prev, message: currentInput }));
      newHistory.push("Sending message...");
      setHistory(newHistory);
      
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            message: currentInput
          }),
        });

        if (response.ok) {
          setTimeout(() => {
            setHistory([...newHistory, "[SUCCESS] Message transmitted successfully.", "Press any key to send another message..."]);
            setStep(3);
          }, 500);
        } else {
          setHistory([...newHistory, "[ERROR] Failed to send message. Please try again."]);
          setStep(0);
        }
      } catch (error) {
        setHistory([...newHistory, "[ERROR] Network error. Please try again."]);
        setStep(0);
      }
    }

    setCurrentInput("");
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", message: "" });
    setCurrentInput("");
    setStep(0);
    setHistory(["$ contact --send", "Enter your name:"]);
  };

  const contacts = [
    { label: "GitHub", url: "#", icon: "github", status: "Unavailable / soon" },
    { label: "LinkedIn", url: "#", icon: "linkedin", status: "Unavailable / soon" },
    { label: "Email", url: "mailto:aya.mbpj@proton.me", icon: "email", status: "Available" },
    { label: "Medium", url: "https://medium.com/@aya.space", icon: "medium", status: "Available" },
  ];

  return (
    <div className="min-h-screen bg-arch-darker flex flex-col">
      <Navbar />

      <main className="flex-1 overflow-auto w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Header */}
        <ShellPanel title="mail@aya">
          <div className="space-y-2">
            <p className="text-arch-accent font-mono text-xs sm:text-sm">$ send_message --to me</p>
            <p className="text-arch-text text-sm">
              Got a question or want to collaborate? Let's connect! I'm always open to discussing tech, data challenges, interesting projects, or just geeking out over architecture patterns.
            </p>
          </div>
        </ShellPanel>

        {/* Contact Grid */}
        <div className="mt-6 md:mt-8">
          <p className="text-arch-accent font-mono text-xs sm:text-sm mb-4">$ connect --social</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 pb-6 md:pb-8">
            {contacts.map((contact) => (
              <ShellCard
                key={`contact-${contact.label}`}
                title={contact.label}
                icon={contact.icon}
                description="Connect with me"
                stats={[{ label: "Status", value: contact.status }]}
                href={contact.url}
              />
            ))}
          </div>
        </div>

        {/* Interactive Terminal Contact Form */}
        <div className="max-w-3xl mx-auto">
          <ShellPanel title="contact --send">
            <div 
              ref={terminalRef}
              className="bg-black/40 rounded p-4 font-mono text-sm h-[280px] overflow-y-auto"
            >
              {history.map((line, idx) => (
                <div key={idx} className={`mb-1 ${
                  line.startsWith('$') ? 'text-arch-blue' : 
                  line.startsWith('>') ? 'text-arch-accent' : 
                  line.startsWith('[ERROR]') ? 'text-red-500' :
                  line.startsWith('[SUCCESS]') ? 'text-green-500' :
                  'text-arch-text'
                }`}>
                  {line}
                </div>
              ))}
              
              {step < 3 && (
                <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 mt-2">
                  <span className="text-arch-blue">aya@arch ~</span>
                  <span className="text-arch-text">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-arch-accent"
                    autoFocus
                  />
                </form>
              )}

              {step === 3 && (
                <button
                  onClick={handleReset}
                  className="mt-2 text-arch-blue hover:text-arch-accent cursor-pointer"
                >
                  Press here to send another message
                </button>
              )}
            </div>
          </ShellPanel>
        </div>
      </main>

      <Taskbar />
    </div>
  );
}
