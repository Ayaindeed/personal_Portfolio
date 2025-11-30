"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Taskbar from "@/components/Taskbar";
import ShellPanel from "@/components/ShellPanel";
import ShellCard from "@/components/ShellCard";
import Terminal from "@/components/Terminal";

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const sections = [
    { title: "Projects", icon: "projects", description: "View my data engineering & full-stack projects", href: "/projects" },
    { title: "Blog", icon: "blog", description: "Read articles about ETL, data pipelines, and tech", href: "/blog" },
    { title: "About", icon: "about", description: "Learn more about me and my experience", href: "/about" },
    { title: "Contact", icon: "contact", description: "Get in touch with me for collaborations", href: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-arch-darker flex flex-col">
      <Navbar />

      {/* Main content */}
      <main className="flex-1 overflow-auto w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Welcome Section */}
        <ShellPanel title="aya@arch-portfolio ~ $">
          <div className="space-y-4 md:space-y-6">
            <div>
              <p className="text-arch-accent font-mono text-xs sm:text-sm mb-3">$ cat profile.txt</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-arch-accent mb-2">Welcome to Aya's Portfolio</h1>
              <p className="text-arch-text text-base sm:text-lg mb-4">
                Data Engineer | Database & ML Specialist
              </p>
              <p className="text-arch-text text-sm leading-relaxed">
                 Designing end-to-end data solutions from database to deployment.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs text-arch-accent font-mono pt-4 border-t border-arch-border overflow-x-auto">
              <div className="whitespace-nowrap">→ Python, Java, Scala</div>
              <div>→ Oracle, MongoDB, Neo4j</div>
              <div>→ Apache Spark, Airflow</div>
              <div>→ Kafka, dbt</div>
              <div>→ TensorFlow, PyTorch</div>
              <div>→ Tableau, Power BI</div>
              <div>→ Docker, Kubernetes</div>
              <div>→ FastAPI, TypeScript</div>
            </div>
          </div>
        </ShellPanel>

        {/* Quick Navigation */}
        <div className="mt-8">
          <p className="text-arch-accent font-mono text-sm mb-4">$ ls -la</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section) => (
              <ShellCard
                key={`nav-${section.title}`}
                title={section.title}
                icon={section.icon}
                description={section.description}
                href={section.href}
              />
            ))}
          </div>
        </div>

        {/* Terminal Emulator */}
        <div className="mt-8">
          <p className="text-arch-accent font-mono text-sm mb-4">$ aya-portfolio --interactive</p>
          <ShellPanel title="terminal">
            <Terminal />
          </ShellPanel>
        </div>

        {/* Stats Section */}
        <div className="mt-8">
          <p className="text-arch-accent font-mono text-sm mb-4">$ ls -l stats/</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-8">
            {[
              { label: "Projects", value: "15+" },
              { label: "Blog Posts", value: "12+" },
              { label: "Certificates", value: "4" },
            ].map((stat) => (
            <ShellPanel key={`stat-${stat.label}`} title={stat.label}>
              <div className="text-center">
                <p className="text-5xl font-bold text-arch-accent mb-2">{stat.value}</p>
                <p className="text-arch-text font-mono text-xs">[{stat.label}]</p>
              </div>
            </ShellPanel>
          ))}
          </div>
        </div>
      </main>

      <Taskbar />
    </div>
  );
}
