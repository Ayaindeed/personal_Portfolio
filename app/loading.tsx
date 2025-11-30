"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoadingScreen() {
  const [displayText, setDisplayText] = useState("");
  const [finished, setFinished] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const characters = "$@!^*&%#~";
    const targetName = "Aya";
    let charIndex = 0;
    let frameCount = 0;

    const interval = setInterval(() => {
      frameCount++;

      if (charIndex < targetName.length) {
        // Animating characters
        if (frameCount % 3 === 0) {
          const randomChars = Array.from(
            { length: charIndex + 1 },
            () => characters[Math.floor(Math.random() * characters.length)]
          ).join("");

          setDisplayText(randomChars + targetName.slice(charIndex + 1));

          if (Math.random() > 0.3) {
            charIndex++;
          }
        }
      } else {
        // Show final name
        setDisplayText(targetName);
        if (frameCount > 60) {
          setFinished(true);
          clearInterval(interval);
          setTimeout(() => router.push("/home"), 500);
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, [router]);

  if (finished) {
    return (
      <div className="min-h-screen bg-arch-darker flex items-center justify-center">
        <div className="text-6xl font-bold text-arch-accent font-mono">Aya</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-arch-darker flex flex-col items-center justify-center gap-8">
      {/* Animated text */}
      <div className="text-5xl md:text-7xl font-bold text-arch-accent font-mono min-h-20 tracking-wider">
        {displayText}
      </div>

      {/* Loading indicator */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={`dot-${i}`}
            className="w-3 h-3 rounded-full bg-arch-blue animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>

      {/* Terminal style text */}
      <div className="text-arch-text font-mono text-sm text-center">
        <p>$ initializing arch-portfolio...</p>
        <p className="text-arch-accent mt-2">Loading profile: aya</p>
      </div>
    </div>
  );
}
