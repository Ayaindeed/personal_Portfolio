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

                lines.forEach((line, idx) => {
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
                        <div key={`code-${idx}`} className="my-4">
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

                  // Handle images
                  if (line.startsWith("![")) {
                    const match = line.match(/!\[(.*?)\]\((.*?)\)/);
                    if (match) {
                      const [, alt, src] = match;
                      elements.push(
                        <div key={idx} className="my-6 flex justify-center">
                          <img src={src} alt={alt} className="border-2 border-arch-blue rounded max-w-sm w-full" />
                        </div>
                      );
                    }
                    return;
                  }

                  // Handle headings
                  if (line.startsWith("## ")) {
                    elements.push(
                      <h2 key={idx} className="text-2xl font-bold text-arch-accent mt-6 mb-3">
                        {line.replace("## ", "")}
                      </h2>
                    );
                    return;
                  }
                  if (line.startsWith("### ")) {
                    elements.push(
                      <h3 key={idx} className="text-xl font-bold text-arch-accent mt-4 mb-2">
                        {line.replace("### ", "")}
                      </h3>
                    );
                    return;
                  }

                  // Handle lists
                  if (line.startsWith("- ")) {
                    elements.push(
                      <div key={idx} className="flex gap-3 ml-4">
                        <span className="text-arch-accent">→</span>
                        <span>{line.replace("- ", "")}</span>
                      </div>
                    );
                    return;
                  }

                  // Regular paragraphs
                  if (line.trim()) {
                    elements.push(
                      <p key={idx} className="leading-relaxed">
                        {line}
                      </p>
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
