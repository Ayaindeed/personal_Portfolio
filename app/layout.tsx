import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aya",
  description: "Arch Linux-themed portfolio showcasing data engineering projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
      </head>
      <body className="bg-arch-darker text-arch-text antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
