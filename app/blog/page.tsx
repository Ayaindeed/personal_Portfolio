import Navbar from "@/components/Navbar";
import Taskbar from "@/components/Taskbar";
import ShellPanel from "@/components/ShellPanel";
import ShellCard from "@/components/ShellCard";
import { getBlogPosts } from "@/lib/get-blog-posts";

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="min-h-screen bg-arch-darker flex flex-col">
      <Navbar />

      <main className="flex-1 overflow-auto w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Header */}
        <ShellPanel title="cd /home/user/blog">
          <div className="space-y-3">
            <p className="text-arch-accent font-mono text-xs sm:text-sm">$ ls -la *.mdx</p>
            <p className="text-arch-text">total {posts.length} posts</p>
            <p className="text-arch-accent text-xs mt-3">-rw-r--r-- {posts.length} user user {posts.length * 2}kb</p>
          </div>
        </ShellPanel>

        {/* Blog Posts */}
        <div className="mt-6 md:mt-8">
          <p className="text-arch-accent font-mono text-xs sm:text-sm mb-4">$ cat *.mdx</p>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-8">
              {posts.map((post) => (
                <ShellCard
                  key={`blog-${post.slug}`}
                  title={post.title}
                  icon="blog"
                  description={post.description || "A blog post"}
                  stats={[
                    { label: "Date", value: new Date(post.date).toLocaleDateString() },
                    { label: "Size", value: "~2kb" },
                  ]}
                  href={`/blog/${post.slug}`}
                />
              ))}
            </div>
          ) : (
            <ShellPanel title="No posts found">
              <p className="text-arch-accent text-center py-8">$ echo "No posts yet - coming soon!"</p>
            </ShellPanel>
          )}
        </div>
      </main>

      <Taskbar />
    </div>
  );
}
