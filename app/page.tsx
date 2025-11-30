"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const [displayText, setDisplayText] = useState("");
  const [finished, setFinished] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const characters = "$@!^*&#~%?+=-[]{}()|\\:;<>/";
    const targetName = "Aya";
    let charIndex = 0;
    let frameCount = 0;

    const interval = setInterval(() => {
      frameCount++;

      if (charIndex < targetName.length) {
        // Morphing characters for each position - show more iterations
        const morph = frameCount % 6 === 0; // Slower morphing
        
        if (morph) {
          const displayChars = Array.from({ length: charIndex + 1 }, (_, i) => {
            if (i < charIndex) {
              return targetName[i]; // Already fixed characters
            } else {
              return characters[Math.floor(Math.random() * characters.length)];
            }
          }).join("");

          setDisplayText(displayChars + targetName.slice(charIndex + 1));

          // Move to next character less frequently - show more morphing
          if (Math.random() > 0.7) {
            charIndex++;
          }
        }
      } else {
        // Show final name
        setDisplayText(targetName);
        if (frameCount > 200) {
          setFinished(true);
          clearInterval(interval);
          setTimeout(() => router.push("/home"), 1000);
        }
      }
    }, 30);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="min-h-screen bg-arch-darker flex flex-col items-center justify-center gap-8 md:gap-12 px-4">
      {/* Animated text - larger and more centered with better font */}
      <div 
        className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-arch-accent min-h-32 md:min-h-40 tracking-tighter text-center leading-none max-w-full"
        style={{
          fontFamily: '"Space Mono", "JetBrains Mono", monospace',
          letterSpacing: '0.15em',
        }}
      >
        {displayText || " "}
      </div>

      {/* Animated dots */}
      <div className="flex gap-2 justify-center">
        {[0, 1, 2].map((i) => (
          <div
            key={`dot-${i}`}
            className="w-2 h-2 rounded-full bg-arch-blue"
            style={{
              animation: finished ? "none" : `bounce 1.4s infinite ${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Terminal messages */}
      {!finished && (
        <div className="text-arch-text font-mono text-sm text-center opacity-80">
          <p>$ initializing arch-portfolio...</p>
          <p className="text-arch-accent mt-2">Loading profile: Aya</p>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        
        @keyframes bounce {
          0%, 80%, 100% { opacity: 0.3; transform: translateY(0); }
          40% { opacity: 1; transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
