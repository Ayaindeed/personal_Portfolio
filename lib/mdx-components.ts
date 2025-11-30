const defaultComponents = {
  h1: ({ children }: any) => (
    <h1 className="text-4xl font-bold text-arch-accent my-6">{children}</h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="text-3xl font-bold text-arch-blue my-4">{children}</h2>
  ),
  p: ({ children }: any) => (
    <p className="text-arch-text leading-7 my-4">{children}</p>
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
  a: ({ children, href }: any) => (
    <a
      href={href}
      className="text-arch-accent hover:text-arch-blue underline transition"
    >
      {children}
    </a>
  ),
  ul: ({ children }: any) => (
    <ul className="list-disc list-inside text-arch-text my-4">{children}</ul>
  ),
  li: ({ children }: any) => <li className="my-2">{children}</li>,
};

export { defaultComponents };
