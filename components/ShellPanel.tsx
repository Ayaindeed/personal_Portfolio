interface ShellPanelProps {
  title: string;
  children: React.ReactNode;
}

export default function ShellPanel({ title, children }: ShellPanelProps) {
  return (
    <div className="w-full border-2 border-arch-blue bg-arch-dark">
      {/* Header */}
      <div className="bg-arch-blue px-4 py-2 flex items-center justify-between">
        <span className="text-white font-mono text-sm font-bold">▌ {title}</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-yellow-400 cursor-pointer hover:bg-yellow-300" />
          <div className="w-3 h-3 bg-red-500 cursor-pointer hover:bg-red-400" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 text-arch-text">{children}</div>
    </div>
  );
}
