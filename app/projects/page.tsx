"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Taskbar from "@/components/Taskbar";
import ShellPanel from "@/components/ShellPanel";
import ShellCard from "@/components/ShellCard";

export default function ProjectsPage() {
  const [showMessage, setShowMessage] = useState(false);

  const handleProjectClick = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const projects = [
    {
      id: "1",
      name: "FreakDetector",
      description: "Anomaly detection system for identifying unusual patterns in data",
      //url: "https://github.com/Ayaindeed/FreakDetector-",
      language: "Python",
      stars: 5,
    },
    {
      id: "2",
      name: "Engineering RAG for the Enterprise with Pinecone",
      description: "Retrieval-Augmented Generation system built with Pinecone for enterprise applications",
      //url: "https://github.com/Ayaindeed/Engineering_RAG_for_the_Enterprise_with_Pinecone",
      language: "Python",
      stars: 3,
    },
    {
      id: "3",
      name: "Smart Code Tagger",
      description: "Intelligent code tagging and categorization system using machine learning",
      //url: "https://github.com/Ayaindeed/Smart_code_tagger",
      language: "Python",
      stars: 7,
    },
    {
      id: "4",
      name: "Sales Method Analysis - Pens & Printers",
      description: "Comprehensive data analysis of 15,000 customer records for sales strategy optimization",
      //url: "https://github.com/Ayaindeed/Sales-Method-Analysis_Pens-Printers",
      language: "Jupyter",
      stars: 1,
    },
    {
      id: "5",
      name: "Multi-Region E-commerce Recommendation System",
      description: "Cloud-native multi-region e-commerce with distributed storage, real-time APIs, and analytics",
      //url: "https://github.com/Ayaindeed/Multi-Region-E-commerce-Recommendation-System",
      language: "Python",
      stars: 5,
    },
    {
      id: "6",
      name: "ELT Data Pipeline",
      description: "Production-ready ELT with dbt, Snowflake, Apache Airflow, and Astronomer Cosmos",
      //url: "https://github.com/Ayaindeed/ELT-Pipeline",
      language: "Python",
      stars: 1,
    },
    {
      id: "7",
      name: "Logical Fallacy Analyzer",
      description: "AI-powered tool that analyzes news articles for logical fallacies using Streamlit and LangChain",
      //url: "https://github.com/Ayaindeed/Logical-fallacy-analyzer",
      language: "Python",
      stars: 1,
    },
    {
      id: "8",
      name: "FromPixelstoPicks",
      description: "Computer vision project transforming pixel data into actionable recommendations",
      //url: "https://github.com/Ayaindeed/FromPixelstoPicks",
      language: "Python",
      stars: 2,
    },
    {
      id: "9",
      name: "Brazilian E-commerce Analysis (DuckDB & SQL)",
      description: "Comprehensive analysis of Brazilian e-commerce patterns using DuckDB and SQL",
      //url: "https://github.com/Ayaindeed/Brazio_-E-commerce_sql_duckDB",
      language: "SQL",
      stars: 1,
    },
    {
      id: "10",
      name: "EncryptMe",
      description: "Encryption and security tool for data protection and privacy",
      //url: "https://github.com/Ayaindeed/EncryptMe",
      language: "Python",
      stars: 4,
    },
  ];

  const icons: { [key: string]: string } = {
    Python: "python",
    SQL: "sql",
    Jupyter: "jupyter",
    TypeScript: "typescript",
    Java: "python",
  };

  return (
    <div className="min-h-screen bg-arch-darker flex flex-col">
      <Navbar />

      <main className="flex-1 overflow-auto w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Notification Message */}
        {showMessage && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-arch-blue border-2 border-arch-accent px-6 py-3 rounded shadow-lg animate-fade-in">
            <p className="text-white font-mono text-sm">
              [NOTICE] Project view coming soon. Check back later!
            </p>
          </div>
        )}

        {/* Header */}
        <ShellPanel title="cd /home/aya/projects">
          <div className="space-y-3">
            <p className="text-arch-accent font-mono text-xs sm:text-sm">$ ls -la</p>
            <p className="text-arch-text">total {projects.length * 2} projects</p>
            <p className="text-arch-accent text-xs mt-3">drwxr-xr-x {projects.length} aya aya Projects</p>
          </div>
        </ShellPanel>

        {/* Projects Grid */}
        <div className="mt-6 md:mt-8">
          <p className="text-arch-accent font-mono text-xs sm:text-sm mb-4">$ cat */README.md</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 pb-6 md:pb-8">
            {projects.map((project) => (
              <ShellCard
                key={project.id}
                title={project.name}
                icon={icons[project.language] || "📦"}
                description={project.description}
                stats={[
                  { label: "Language", value: project.language },
                  { label: "Stars", value: `⭐ ${project.stars}` },
                ]}
                onClick={handleProjectClick}
                //href={project.url}
              />
            ))}
          </div>
        </div>
      </main>

      <Taskbar />
    </div>
  );
}
