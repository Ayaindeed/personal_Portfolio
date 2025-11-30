export async function fetchGitHubRepos(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const repos = await response.json();

    return repos
      .filter((repo: any) => !repo.fork)
      .sort((a: any, b: any) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, 12); // Get top 12 repos
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
    return [];
  }
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  updated_at: string;
}
