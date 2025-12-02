# Arch Linux-Themed Portfolio

A terminal-inspired portfolio website showcasing projects, blog posts, and technical expertise with an authentic Arch Linux aesthetic. Built with Next.js, featuring interactive terminal commands, MDX blog support, and a fully responsive design.

## Project Structure

```
portfolio/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles with Arch theme
│   ├── page.tsx           # Landing page with animation
│   ├── loading.tsx        # Loading state
│   ├── home/              # Main home page
│   ├── projects/          # Projects showcase
│   ├── blog/              # Blog listing & individual posts
│   │   └── [slug]/        # Dynamic blog post routes
│   ├── about/             # About page with skills
│   ├── contact/           # Interactive terminal contact form
│   └── api/               # API routes
│       └── contact/       # Contact form endpoint
│
├── components/            # React components
│   ├── Navbar.tsx         # Navigation with terminal tabs
│   ├── Taskbar.tsx        # Bottom taskbar
│   ├── Terminal.tsx       # Interactive terminal emulator
│   ├── ShellPanel.tsx     # Terminal-style panels
│   └── ShellCard.tsx      # Project/blog cards
│
├── lib/                   # Utilities and helpers
│   ├── get-blog-posts.ts  # MDX blog post parser
│   ├── github.ts          # GitHub API integration
│   ├── mdx-components.tsx # Custom MDX components
│   └── types.ts           # TypeScript types
│
├── utils/                 # Formatter utilities
│   └── formatters.ts      # Date/text formatters
│
├── content/               # Static content
│   └── blog/              # MDX blog posts
│       ├── building-arch-portfolio.mdx
│       ├── emotional-data-analysis.mdx
│       ├── getting-started-airflow.mdx
│       └── spark-pipelines.mdx
│
├── messages/              # Contact form submissions (gitignored)
│
└── config files           # Next.js, Tailwind, TypeScript configs
    ├── next.config.js
    ├── tailwind.config.ts
    ├── tsconfig.json
    └── postcss.config.js
```

## Features

- **Arch Linux Theme**: Iconic blue (#1793d1) and dark aesthetic
- **Terminal-Style UI**: Window frames with authentic terminal look
- **Responsive Design**: Mobile-friendly layout with Tailwind CSS
- **MDX Blog**: Write blog posts in Markdown with React components
- **GitHub Integration**: Fetch and display your repositories
- **Dark Mode**: Professional dark theme optimized for readability
- **TypeScript**: Full type safety

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see your portfolio.

### Configuration

Update your profile info in `lib/types.ts`:

```typescript
export const config: PortfolioConfig = {
  name: "Your Name",
  title: "Full Stack Data Engineer",
  description: "Your bio here",
  githubUsername: "your-username",
  // ... other settings
};
```

### Adding Blog Posts

Create new MDX files in `content/blog/`:

```mdx
---
title: "Your Post Title"
date: "2024-01-15"
description: "Post description"
---

# Your Post Title

Content here...
```

## Tech Stack

- **Framework**: Next.js 14+ with React 18
- **Styling**: Tailwind CSS + Custom CSS
- **Content**: MDX for blog posts
- **Language**: TypeScript
- **API**: GitHub API for projects

## Customization

### Colors

Customize the Arch theme colors in `tailwind.config.ts`:

```typescript
colors: {
  arch: {
    blue: "#1793d1",      // Main accent
    dark: "#0f0f0f",      // Dark background
    accent: "#00d4ff",    // Bright accent
  }
}
```

### Fonts

Change fonts in `tailwind.config.ts`:

```typescript
fontFamily: {
  mono: ["Fira Code", "monospace"],
  sans: ["Inter", "sans-serif"],
}
```

## Integration Examples

### GitHub Projects

Update `lib/github.ts` to fetch your real projects:

```typescript
const repos = await fetchGitHubRepos("your-username");
```

### Email Contact

Set up your email service (SendGrid, Resend, etc.) in the contact form.

## Sections

- **Home**: Hero section with quick stats and tech stack
- **Projects**: Showcase your GitHub projects with stats
- **Blog**: Technical articles and insights
- **About**: Professional background and skills
- **Contact**: Get in touch form



## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [MDX](https://mdxjs.com/)


---

Built with love. -A
