import Navbar from "@/components/Navbar";
import Taskbar from "@/components/Taskbar";
import ShellPanel from "@/components/ShellPanel";
import Link from "next/link";
import { getBlogPost, getBlogPosts } from "@/lib/get-blog-posts";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-arch-darker flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <ShellPanel title="error">
            <div className="space-y-3">
              <p className="text-arch-accent font-mono text-xs sm:text-sm">$ cat posts</p>
              <p className="text-arch-text">404: Post not found</p>
              <Link href="/blog" className="text-arch-blue hover:text-arch-accent transition mt-4 inline-block">
                → Back to blog
              </Link>
            </div>
          </ShellPanel>
        </main>
        <Taskbar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-arch-darker flex flex-col">
      <Navbar />

      <main className="flex-1 overflow-auto w-full max-w-4xl mx-auto px-4 py-8">
        <ShellPanel title="reading">
          <div className="space-y-6">
            {/* Post Header */}
            <div>
              <h1 className="text-4xl font-bold text-arch-accent mb-3">{post.title}</h1>
            </div>

            {/* Divider */}
            <div className="border-t border-arch-border"></div>

            {/* Post Content */}
            <article className="prose prose-invert max-w-none space-y-4 text-arch-text">
              {(() => {
                const lines = post.content.split("\n");
                const elements: JSX.Element[] = [];
                let inCodeBlock = false;
                let codeBlockLines: string[] = [];
                let codeBlockLang = "";
                let skipFirstH1 = false; // Skip the duplicate H1 title

                const processTextContent = (text: string) => {
                  return text
                    // Handle bold text
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-arch-accent font-bold">$1</strong>')
                    // Handle inline code
                    .replace(/`([^`]+)`/g, '<code class="bg-arch-dark px-2 py-1 rounded text-arch-accent text-sm font-mono">$1</code>')
                    // Handle markdown links
                    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-arch-accent hover:text-arch-blue underline transition-colors">$1</a>');
                };

                lines.forEach((line, idx) => {
                  // Skip the first H1 since we already show the title
                  if (line.startsWith("# ") && !skipFirstH1) {
                    skipFirstH1 = true;
                    return;
                  }

                  // Handle code block start
                  if (line.startsWith("```")) {
                    if (!inCodeBlock) {
                      inCodeBlock = true;
                      codeBlockLang = line.replace("```", "").trim();
                      codeBlockLines = [];
                    } else {
                      // Code block end
                      inCodeBlock = false;
                      elements.push(
                        <div key={`code-${idx}`} className="my-6">
                          <div className="bg-arch-darker border border-arch-blue rounded-t px-3 py-1 font-mono text-xs text-arch-accent">
                            {codeBlockLang || "code"}
                          </div>
                          <pre className="bg-arch-darker border border-arch-blue border-t-0 rounded-b p-4 overflow-x-auto">
                            <code className="font-mono text-sm text-arch-accent">
                              {codeBlockLines.join("\n")}
                            </code>
                          </pre>
                        </div>
                      );
                      codeBlockLines = [];
                      codeBlockLang = "";
                    }
                    return;
                  }

                  // Collect code block lines
                  if (inCodeBlock) {
                    codeBlockLines.push(line);
                    return;
                  }

                  // Handle HTML img tags
                  if (line.includes("<img")) {
                    const srcMatch = line.match(/src="([^"]+)"/);
                    const altMatch = line.match(/alt="([^"]+)"/);
                    
                    if (srcMatch) {
                      const src = srcMatch[1];
                      const alt = altMatch ? altMatch[1] : "";
                      
                      elements.push(
                        <div key={idx} className="my-4">
                          <img 
                            src={src} 
                            alt={alt} 
                            className="w-full rounded border border-arch-border"
                          />
                        </div>
                      );
                    }
                    return;
                  }

                  // Handle markdown images
                  if (line.startsWith("![")) {
                    const match = line.match(/!\[(.*?)\]\((.*?)\)/);
                    if (match) {
                      const [, alt, src] = match;
                      elements.push(
                        <div key={idx} className="my-4">
                          <img src={src} alt={alt} className="w-full rounded border border-arch-border" />
                        </div>
                      );
                    }
                    return;
                  }

                  // Handle headings
                  if (line.startsWith("## ")) {
                    const sectionTitle = line.replace("## ", "");
                    elements.push(
                      <h2 key={idx} className="text-3xl font-bold text-arch-blue mt-20 mb-6" style={{lineHeight: '2'}}>
                        {processTextContent(sectionTitle)}
                      </h2>
                    );
                    return;
                  }
                  if (line.startsWith("### ")) {
                    const content = line.replace("### ", "");
                    // Check if content starts with any bullet point (• ◆ ■ ▶ ➢ ◇ ➛)
                    if (content.match(/^[•◆■▶➢◇➛]\s/)) {
                      // Already has a bullet, render without adding another
                      elements.push(
                        <h3 key={idx} className="text-xl font-bold text-arch-accent mt-8 mb-4" style={{lineHeight: '2'}}>
                          <span dangerouslySetInnerHTML={{ __html: processTextContent(content) }} />
                        </h3>
                      );
                    } else {
                      // No existing bullet, just render without adding one
                      elements.push(
                        <h3 key={idx} className="text-xl font-bold text-arch-accent mt-8 mb-4" style={{lineHeight: '2'}}>
                          <span dangerouslySetInnerHTML={{ __html: processTextContent(content) }} />
                        </h3>
                      );
                    }
                    return;
                  }

                  // Handle lists
                  if (line.startsWith("- ")) {
                    const content = line.replace("- ", "");
                    elements.push(
                      <div key={idx} className="flex gap-3 ml-4 my-3">
                        <span className="text-arch-accent text-sm mt-1">▶</span>
                        <span className="text-justify" style={{lineHeight: '1.25'}} dangerouslySetInnerHTML={{ __html: processTextContent(content) }} />
                      </div>
                    );
                    return;
                  }

                  // Handle numbered lists
                  if (/^\d+\./.test(line)) {
                    const content = line.replace(/^\d+\.\s*/, "");
                    elements.push(
                      <div key={idx} className="flex gap-3 ml-4 my-3">
                        <span className="text-arch-blue font-bold text-sm mt-1">●</span>
                        <span className="text-justify" style={{lineHeight: '1.25'}} dangerouslySetInnerHTML={{ __html: processTextContent(content) }} />
                      </div>
                    );
                    return;
                  }

                  // Regular paragraphs with formatting
                  if (line.trim()) {
                    elements.push(
                      <p key={idx} className="text-justify my-4" style={{lineHeight: '1.25'}} dangerouslySetInnerHTML={{ __html: processTextContent(line) }} />
                    );
                  }
                });

                return elements;
              })()}
            </article>

            {/* Divider */}
            <div className="border-t border-arch-border"></div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Link href="/blog" className="text-arch-blue hover:text-arch-accent transition">
                ← Back to blog
              </Link>
              <span className="text-xs text-arch-border font-mono">End of post</span>
            </div>
          </div>
        </ShellPanel>
      </main>

      <Taskbar />
    </div>
  );
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
