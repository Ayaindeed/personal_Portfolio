export interface PortfolioConfig {
  name: string;
  title: string;
  description: string;
  githubUsername: string;
  email: string;
  links: {
    github: string;
    linkedin: string;
    twitter?: string;
  };
  skills: {
    languages: string[];
    databases: string[];
    tools: string[];
  };
}

export const config: PortfolioConfig = {
  name: "Your Name",
  title: "Full Stack Data Engineer",
  description: "Building data pipelines and analytics platforms",
  githubUsername: "your-github-username",
  email: "your.email@example.com",
  links: {
    github: "https://github.com/your-username",
    linkedin: "https://linkedin.com/in/your-profile",
    twitter: "https://twitter.com/your-handle",
  },
  skills: {
    languages: ["Python", "SQL", "TypeScript", "JavaScript"],
    databases: ["PostgreSQL", "MongoDB", "Snowflake", "BigQuery"],
    tools: ["Apache Airflow", "Spark", "dbt", "Docker", "Kubernetes"],
  },
};
