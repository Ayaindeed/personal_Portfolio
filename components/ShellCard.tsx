interface ShellCardProps {
  title: string;
  icon?: string;
  description?: string;
  stats?: { label: string; value: string }[];
  onClick?: () => void;
  href?: string;
  className?: string;
}

const renderIcon = (iconName?: string) => {
  const iconMap: { [key: string]: JSX.Element } = {
    "languages": (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 18l6-6 6 6M3 12l6-6 6 6"/>
      </svg>
    ),
    "databases": (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M3 5v14a9 3 0 0 0 18 0V5"></path>
      </svg>
    ),
    "engineering": (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="1"></circle>
        <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 0l4.24-4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08 0l4.24 4.24"/>
      </svg>
    ),
    "ai": (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9"></circle>
        <path d="M9 9h0m6 0h0M9 15h6"/>
      </svg>
    ),
    "visualization": (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="3 3 7 3 7 7 3 7 3 3"></polyline>
        <polyline points="14 3 21 3 21 10 14 10 14 3"></polyline>
        <polyline points="14 14 21 14 21 21 14 21 14 14"></polyline>
        <polyline points="3 14 10 14 10 21 3 21 3 14"></polyline>
      </svg>
    ),
    "design": (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 12h18M12 3v18M3 6l5 5m0 0l5-5M12 9l5 5 5-5m-10 0l-5-5m0 0l-5 5"/>
      </svg>
    ),
    "projects": (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7"></path>
        <polyline points="17 3 19 7 5 7 7 3"></polyline>
      </svg>
    ),
    "blog": (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
      </svg>
    ),
    "about": (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="4"></circle>
        <path d="M6 20.3a9 9 0 0 1 12 0"></path>
      </svg>
    ),
    "contact": (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22 6 12 13 2 6"></polyline>
      </svg>
    ),
    "python": (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 3h12v6H6zM3 9h18M6 15h12v6H6z"/>
      </svg>
    ),
    "sql": (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9h18M3 9v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9M9 9V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4"/>
      </svg>
    ),
    "jupyter": (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2"></rect>
        <line x1="9" y1="9" x2="9" y2="15"></line>
        <line x1="15" y1="9" x2="15" y2="15"></line>
      </svg>
    ),
    "typescript": (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="3 7 7 3 21 3 21 21 3 21 3 7"></polyline>
        <line x1="12" y1="12" x2="12" y2="18"></line>
      </svg>
    ),
    "github": (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    "linkedin": (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    ),
    "email": (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
      </svg>
    ),
    "medium": (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
      </svg>
    ),
    "painting": (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    "idea": (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    ),
    "writing": (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
      </svg>
    ),
    "reading": (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
      </svg>
    ),
  };

  return iconMap[iconName?.toLowerCase() || ""] || (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16v16H4z"></path>
    </svg>
  );
};

export default function ShellCard({
  title,
  icon,
  description,
  stats,
  onClick,
  href,
  className = "",
}: ShellCardProps) {
  const content = (
    <div className="flex flex-col h-full gap-2">
      {/* Card header with icon */}
      <div className="flex items-center gap-2 pb-2 border-b border-arch-border">
        <span className="text-arch-accent">{renderIcon(icon)}</span>
        <span className="font-mono text-arch-accent font-bold truncate">{title}</span>
      </div>

      {/* Description */}
      {description && (
        <p className="text-sm text-arch-text flex-1 overflow-auto">{description}</p>
      )}

      {/* Stats */}
      {stats && stats.length > 0 && (
        <div className="space-y-1 text-xs mt-auto">
          {stats.map((stat) => (
            <div key={`stat-${stat.label}`} className="flex justify-between text-arch-accent">
              <span>{stat.label}:</span>
              <span className="text-arch-text">{stat.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Footer action */}
      {(href || onClick) && (
        <div className="pt-2 border-t border-arch-border text-xs text-arch-blue hover:text-arch-accent transition-colors cursor-pointer">
          → Enter
        </div>
      )}
    </div>
  );

  if (href) {
    const isExternal = href.startsWith('http://') || href.startsWith('https://');
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : "_self"}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={`block p-4 border-2 border-arch-blue bg-arch-dark hover:bg-arch-blue hover:bg-opacity-10 transition-all h-48 ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`w-full p-4 border-2 border-arch-blue bg-arch-dark hover:bg-arch-blue hover:bg-opacity-10 transition-all h-48 text-left ${className}`}
    >
      {content}
    </button>
  );
}
