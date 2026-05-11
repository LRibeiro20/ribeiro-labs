import { NextResponse } from "next/server";

const GITHUB_USERNAME = "LRibeiro20";
const LINKEDIN_URL = "https://www.linkedin.com/in/luis-ribeiro-engineer/";

export async function GET() {
  try {
    // Fetch GitHub profile
    const [profileRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        headers: { "Accept": "application/vnd.github.v3+json" },
        next: { revalidate: 3600 } // Cache for 1 hour
      }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=15`, {
        headers: { "Accept": "application/vnd.github.v3+json" },
        next: { revalidate: 3600 }
      })
    ]);

    const profile = await profileRes.json();
    const repos = await reposRes.json();

    // Build GitHub summary
    const githubSummary = {
      name: profile.name || GITHUB_USERNAME,
      bio: profile.bio || "",
      publicRepos: profile.public_repos || 0,
      followers: profile.followers || 0,
      location: profile.location || "",
      repos: Array.isArray(repos) ? repos.map((r: any) => ({
        name: r.name,
        description: r.description || "No description",
        language: r.language || "Unknown",
        stars: r.stargazers_count || 0,
        topics: r.topics || [],
        url: r.html_url
      })) : []
    };

    // Format into readable text
    const repoList = githubSummary.repos
      .map((r: any) => `  - ${r.name} (${r.language}): ${r.description}${r.topics.length > 0 ? ` [Topics: ${r.topics.join(", ")}]` : ""}`)
      .join("\n");

    const profileText = `
=== LIVE GITHUB DATA (github.com/${GITHUB_USERNAME}) ===
Name: ${githubSummary.name}
Bio: ${githubSummary.bio}
Location: ${githubSummary.location}
Public Repositories: ${githubSummary.publicRepos}
Followers: ${githubSummary.followers}
LinkedIn: ${LINKEDIN_URL}

Recent Repositories:
${repoList}
`.trim();

    return NextResponse.json({ profile: profileText });
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return NextResponse.json({ profile: "" });
  }
}
