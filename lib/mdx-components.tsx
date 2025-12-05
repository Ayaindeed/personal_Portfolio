import React from "react";

const defaultComponents = {
  h1: ({ children }: any) => (
    <h1 className="text-4xl font-bold text-arch-accent my-6">{children}</h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="text-3xl font-bold text-arch-blue my-4">{children}</h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-2xl font-bold text-arch-accent my-3">{children}</h3>
  ),
  p: ({ children }: any) => (
    <p className="text-arch-text leading-7 my-4">{children}</p>
  ),
  strong: ({ children }: any) => (
    <strong className="font-bold text-arch-accent">{children}</strong>
  ),
  em: ({ children }: any) => (
    <em className="italic text-arch-text">{children}</em>
  ),
  code: ({ children }: any) => (
    <code className="bg-arch-dark px-2 py-1 rounded text-arch-accent text-sm font-mono">
      {children}
    </code>
  ),
  pre: ({ children }: any) => (
    <pre className="bg-terminal p-4 rounded my-4 overflow-x-auto text-arch-text border border-arch-border">
      {children}
    </pre>
  ),
  img: ({ src, alt, style, ...props }: any) => (
    <img
      src={src}
      alt={alt}
      style={style}
      className="rounded border border-arch-border max-w-full h-auto"
      {...props}
    />
  ),
  a: ({ children, href }: any) => (
    <a
      href={href}
      className="text-arch-accent hover:text-arch-blue underline transition"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  ul: ({ children }: any) => (
    <ul className="list-disc list-inside text-arch-text my-4 space-y-2">{children}</ul>
  ),
  ol: ({ children }: any) => (
    <ol className="list-decimal list-inside text-arch-text my-4 space-y-2">{children}</ol>
  ),
  li: ({ children }: any) => <li className="my-2">{children}</li>,
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-arch-blue pl-4 my-4 text-arch-text italic">
      {children}
    </blockquote>
  ),
  BlueHeading: ({ children, level = 1 }: any) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    const sizes = {
      1: "text-4xl",
      2: "text-3xl", 
      3: "text-2xl",
      4: "text-xl",
      5: "text-lg",
      6: "text-base"
    };
    return (
      <Tag className={`${sizes[level as keyof typeof sizes]} font-bold text-arch-blue my-4`}>
        {children}
      </Tag>
    );
  },
};

export { defaultComponents };
