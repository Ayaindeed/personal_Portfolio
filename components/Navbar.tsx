"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [displayName, setDisplayName] = useState("");
  const [mounted, setMounted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const pathname = usePathname();

  const animateName = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const characters = "$@!^*&%#~";
    const targetName = "aya@arch";
    let charIndex = 0;
    let frameCount = 0;

    const interval = setInterval(() => {
      frameCount++;

      if (charIndex < targetName.length) {
        if (frameCount % 4 === 0) {
          const randomChars = Array.from(
            { length: charIndex + 1 },
            () => characters[Math.floor(Math.random() * characters.length)]
          ).join("");

          setDisplayName(randomChars + targetName.slice(charIndex + 1));

          if (Math.random() > 0.4) {
            charIndex++;
          }
        }
      } else {
        setDisplayName(targetName);
        setIsAnimating(false);
        clearInterval(interval);
      }
    }, 60);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    setMounted(true);
    animateName();
  }, []);

  const handleLightModeClick = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const navItems = [
    { href: "/home", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-arch-dark border-b-2 border-arch-blue sticky top-0 z-50">
      <div className="bg-arch-blue px-4 py-2 flex items-center justify-between">
        <button
          onClick={animateName}
          className="font-mono text-white font-bold text-sm hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-none outline-none"
          disabled={isAnimating}
        >
          {mounted ? displayName || "aya@arch" : "aya@arch"}
        </button>
        <div className="flex gap-2 items-center">
          <button
            onClick={handleLightModeClick}
            className="p-2 bg-transparent hover:opacity-70 transition-opacity"
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none'
            }}
            title="Try light mode (spoiler: you won't like it)"
          >
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
          <button className="w-3 h-3 bg-yellow-400 hover:bg-yellow-300 transition-colors" />
          <button className="w-3 h-3 bg-red-500 hover:bg-red-400 transition-colors" />
        </div>
      </div>

      {showMessage && (
        <div className="bg-arch-blue bg-opacity-30 px-4 py-2 border-b border-arch-blue">
          <p className="text-white font-mono text-sm">
            Light mode? More like BIOS mode. We stay terminal-dark. 🖤
          </p>
        </div>
      )}

      {/* Desktop Navigation - Hidden on mobile */}
      <div className="hidden md:flex px-4 py-2 bg-arch-dark border-b border-arch-border">
        <div className="flex items-center justify-between w-full font-mono text-xs">
          <span className="text-arch-accent">┌</span>
          {navItems.map((item, index) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <div key={`nav-${item.href}`} className="flex items-center flex-1">
                <span className={`flex-1 ${isActive ? "text-arch-blue" : "text-arch-accent"}`}>
                  {isActive ? "═══" : "───"}
                </span>
                <Link
                  href={item.href}
                  className={`px-4 py-1 whitespace-nowrap transition-all ${
                    isActive
                      ? "text-arch-blue font-bold bg-arch-blue bg-opacity-10"
                      : "text-arch-text hover:text-arch-blue hover:bg-arch-blue hover:bg-opacity-10"
                  }`}
                >
                  [{item.label}]
                </Link>
                <span className={`flex-1 ${isActive ? "text-arch-blue" : "text-arch-accent"}`}>
                  {isActive ? "═══" : "───"}
                </span>
                {index < navItems.length - 1 ? (
                  <span className={isActive ? "text-arch-blue" : "text-arch-accent"}>
                    {isActive ? "╪" : "┬"}
                  </span>
                ) : (
                  <span className={isActive ? "text-arch-blue" : "text-arch-accent"}>┐</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Navigation - Hamburger menu */}
      <div className="md:hidden border-b border-arch-border">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-full px-4 py-2 bg-arch-dark text-arch-accent font-mono text-xs flex items-center justify-between hover:bg-arch-blue hover:bg-opacity-10 transition-all"
        >
          <span>$ ls menu/</span>
          <span className="text-lg">{mobileMenuOpen ? "▼" : "▶"}</span>
        </button>
        
        {mobileMenuOpen && (
          <div className="bg-arch-dark border-t border-arch-border">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={`mobile-${item.href}`}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 font-mono text-xs border-b border-arch-border transition-all ${
                    isActive
                      ? "text-arch-blue font-bold bg-arch-blue bg-opacity-10 border-l-4 border-l-arch-blue"
                      : "text-arch-text hover:text-arch-blue hover:bg-arch-blue hover:bg-opacity-5 border-l-4 border-l-transparent"
                  }`}
                >
                  <span className="text-arch-accent">→ </span>
                  [{item.label}]
                  {isActive && <span className="text-arch-blue ml-2">*</span>}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
