"use client";

import Navbar from "@/components/Navbar";
import Taskbar from "@/components/Taskbar";
import ShellPanel from "@/components/ShellPanel";
import ShellCard from "@/components/ShellCard";

const renderIcon = (iconName?: string) => {
  const iconMap: { [key: string]: JSX.Element } = {
    "painting": (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m14.622 17.897-10.68-2.913"></path>
        <path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0l4.02-4.02z"></path>
        <path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15"></path>
      </svg>
    ),
    "idea": (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    ),
    "writing": (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
      </svg>
    ),
    "reading": (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
      </svg>
    ),
  };

  return iconMap[iconName?.toLowerCase() || ""];
};

export default function AboutPage() {
  const skillGroups = [
    {
      title: "Languages",
      icon: "languages",
      description: "Python, Java, Scala, R, Julia, JavaScript, TypeScript, SQL",
      stats: [
        { label: "Primary", value: "Python" },
        { label: "Total", value: "8 languages" },
      ],
    },
    {
      title: "Databases & Storage",
      icon: "databases",
      description: "MySQL, SQL Server, Oracle DB, PostgreSQL, MongoDB, HBase, Neo4j, Redis, MinIO, OCI Object Storage, DuckDB",
      stats: [
        { label: "Relational", value: "5" },
        { label: "NoSQL/Other", value: "6" },
      ],
    },
    {
      title: "Data Engineering",
      icon: "engineering",
      description: "Apache Spark, Hadoop, Kafka, Apache Airflow, Talend, dbt, Apache Flink, Snowflake, DeltaLake, Databricks",
      stats: [
        { label: "Orchestration", value: "Airflow" },
        { label: "Processing", value: "Spark" },
      ],
    },
    {
      title: "ML/AI & Data Science",
      icon: "ai",
      description: "Scikit-learn, XGBoost, TensorFlow, PyTorch, Keras, OpenCV, YOLO, BERT, LangChain, Pandas, NumPy, SciPy",
      stats: [
        { label: "ML Frameworks", value: "6+" },
        { label: "DL/NLP", value: "5+" },
      ],
    },
    {
      title: "Visualization & BI",
      icon: "visualization",
      description: "Tableau, Power BI, Plotly, Matplotlib, Seaborn, Streamlit, Grafana, InfluxDB",
      stats: [
        { label: "BI Tools", value: "2" },
        { label: "Viz Libraries", value: "6" },
      ],
    },
    {
      title: "Cloud & DevOps",
      icon: "design",
      description: "AWS (S3, EC2, Lambda, RDS), Oracle Cloud Infrastructure (OCI), Docker, Kubernetes, Git, CI/CD, Terraform",
      stats: [
        { label: "Cloud Platforms", value: "AWS, OCI" },
        { label: "Container Orchestration", value: "K8s" },
      ],
    },
  ];

  const hobbies = [
    { icon: "painting", name: "Painting" },
    { icon: "idea", name: "Digital Curiosity" },
    { icon: "writing", name: "Creative Writing" },
    { icon: "reading", name: "Reading" },
  ];

  const certificates = [
    {
      title: "Neo4j Graph Data Science",
      date: "Sep 2025",
      issuer: "Neo4j",
      //url: "https://graphacademy.neo4j.com/c/c21e73ad-8a38-4a08-b66f-64cf091aca0b/",
    },
    {
      title: "Professional Data Analyst",
      date: "Sep 2025",
      issuer: "DataCamp",
      //url: "https://www.datacamp.com/certificate/DA0028482103094",
    },
    {
      title: "Oracle Cloud Infrastructure Certified Foundations Associate",
      date: "Jul 2025",
      issuer: "Oracle",
      //url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=AEAA8DBF42004264FB888BEB095C91A883E0E71408CC46468297EE9FD334F32F",
    },
    {
      title: "Associate Data Scientist",
      date: "Jan 2023",
      issuer: "DataCamp",
      //url: "https://www.datacamp.com/certificate/DSA0018692984334",
    },
  ];

  return (
    <div className="min-h-screen bg-arch-darker flex flex-col">
      <Navbar />

      <main className="flex-1 overflow-auto w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Header - whoami */}
        <ShellPanel title="whoami">
          <div className="space-y-3">
            <p className="text-arch-accent font-mono text-xs sm:text-sm">$ whoami</p>
            <p className="text-arch-text">aya@arch-portfolio</p>
            <p className="text-arch-text text-sm mt-4 leading-relaxed">
              Started with database administration, expanded into data science and ML, 
              now learning to build the infrastructure that makes models production-ready. 
              Passionate about scalable data systems and cloud architecture.
            </p>
            <p className="text-arch-text text-sm mt-4 leading-relaxed">
              Let's connect to know more about me.
            </p>
          </div>
        </ShellPanel>

        {/* Skills Grid */}
        <div className="mt-6 md:mt-8">
          <p className="text-arch-accent font-mono text-xs sm:text-sm mb-4">$ cat skills.txt</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 pb-6 md:pb-8">
            {skillGroups.map((group) => (
              <ShellCard
                key={`skill-${group.title}`}
                title={group.title}
                icon={group.icon}
                description={group.description}
                stats={group.stats}
              />
            ))}
          </div>
        </div>

        {/* Hobbies & Interests */}
        <ShellPanel title="cat hobbies.txt">
          <div className="space-y-3">
            <p className="text-arch-accent font-mono text-sm">$ cat hobbies.txt</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {hobbies.map((hobby) => (
                <div key={hobby.name} className="p-4 bg-arch-darker border border-arch-accent rounded hover:border-arch-blue transition">
                  <div className="mb-3 font-bold text-arch-accent">{renderIcon(hobby.icon)}</div>
                  <p className="text-arch-text text-sm font-mono">{hobby.name}</p>
                </div>
              ))}
            </div>
          </div>
        </ShellPanel>

        {/* Certificates */}
        <ShellPanel title="cat certificates.txt">
          <div className="space-y-3">
            <p className="text-arch-accent font-mono text-sm">$ ls -la certificates/</p>
            <div className="space-y-3 mt-4">
              {certificates.map((cert) => (
                <a
                  key={cert.title}
                  //href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-arch-darker border border-arch-blue rounded hover:bg-opacity-80 hover:border-arch-accent transition cursor-pointer block"
                >
                  <p className="text-arch-text font-mono text-sm hover:text-arch-accent transition">{cert.title}</p>
                  <p className="text-arch-accent text-xs mt-2">{cert.issuer} • {cert.date}</p>
                  <p className="text-arch-accent text-xs mt-1 opacity-70">→ View Certificate</p>
                </a>
              ))}
            </div>
          </div>
        </ShellPanel>

        {/* Resume Download */}
        <ShellPanel title="wget resume">
          <div className="space-y-3">
            <p className="text-arch-accent font-mono text-sm">$ wget https://aya-portfolio.com/resume.pdf</p>
            <div className="bg-arch-darker border border-arch-blue p-4 font-mono text-xs">
              <p className="text-arch-text">--2025-11-30 00:00:00-- https://aya-portfolio.com/resume.pdf</p>
              <p className="text-arch-text">Resolving aya-portfolio.com... <span className="text-arch-accent">pending</span></p>
              <p className="text-arch-text mt-2">HTTP request sent, awaiting response...</p>
              <p className="text-red-400 mt-1">[ERROR 503] Service Temporarily Unavailable</p>
              <p className="text-arch-accent mt-2">The resume is still being compiled.</p>
              <p className="text-arch-text">LaTeX formatting in progress. Please stand by.</p>
            </div>
            <button
              onClick={() => {
                const msg = `[aya@arch-portfolio ~]$ cat resume.pdf\n\nConnecting to server...\n[FAILED] 503 Service Unavailable\n\nError: Resume compilation not complete.\nReason: LaTeX formatting still in progress.\nAction: Check back soon or contact administrator.\n\nIncident logged to /var/log/resume.log`;
                alert(msg);
              }}
              className="group flex items-center justify-between w-full p-4 bg-arch-dark border-2 border-arch-blue text-arch-text font-mono text-sm hover:border-arch-accent hover:bg-arch-blue hover:bg-opacity-5 transition-all"
            >
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-arch-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <div className="text-left">
                  <div className="text-arch-accent">resume.pdf</div>
                  <div className="text-xs text-arch-text opacity-70">-rw-r--r-- 1 aya aya</div>
                </div>
              </div>
              <span className="text-arch-blue group-hover:text-arch-accent transition-colors">→</span>
            </button>
          </div>
        </ShellPanel>
      </main>

      <Taskbar />
    </div>
  );
}
