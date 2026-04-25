import { Metadata } from "next";
import Link from "next/link";
import { projects, Project } from "@/config/projects";
import { ArrowRight, ExternalLink, Star, Folder, GitBranch } from "lucide-react";

const Github = Folder;

interface GithubRepo {
  name: string;
  description: string;
  url: string;
  stars: number;
  language: string;
  homepage?: string;
}

async function getGithubRepos(): Promise<GithubRepo[]> {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
  
  if (!token || !username) {
    return [];
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`, {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      return [];
    }

    const repos = await response.json();
    return repos.map((repo: any) => ({
      name: repo.name,
      description: repo.description || "",
      url: repo.html_url,
      stars: repo.stargazers_count,
      language: repo.language,
      homepage: repo.homepage,
    }));
  } catch {
    return [];
  }
}

export const metadata: Metadata = {
  title: "Proyectos | Lisandro Dev",
  description: "Explora mis proyectos de desarrollo web, dashboards y sistemas.",
};

export default async function ProjectsPage() {
  const githubRepos = await getGithubRepos();
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <div className="section">
      <h1 className="section-title">Proyectos</h1>
      
      {featuredProjects.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Proyectos Destacados
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}

      {githubRepos.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Github className="w-5 h-5" />
            GitHub
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {githubRepos.slice(0, 6).map((repo) => (
              <GithubCard key={repo.name} repo={repo} />
            ))}
          </div>
        </section>
      )}

      {otherProjects.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-6">Otros Proyectos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card hover:border-[var(--primary)] transition-colors">
      <div className="aspect-video bg-[var(--secondary)] rounded-lg mb-4 flex items-center justify-center overflow-hidden">
        {project.image ? (
          <img src={project.image} alt={project.title} className="w-full h-full object-cover rounded-lg" />
        ) : (
          <span className="text-4xl">🖥️</span>
        )}
      </div>
      
      <div className="flex items-start justify-between mb-2">
        <h2 className="text-lg font-semibold">{project.title}</h2>
        <span className="text-xs px-2 py-1 bg-[var(--primary)] text-white rounded">{project.percentage}%</span>
      </div>
      
      <p className="text-sm text-[var(--muted)] mb-4">{project.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.slice(0, 4).map((tech) => (
          <span key={tech} className="px-2 py-1 bg-[var(--secondary)] rounded text-xs">
            {tech}
          </span>
        ))}
      </div>
      
      <div className="flex gap-3">
        <Link href={`/projects/${project.slug}`} className="flex items-center gap-1 text-sm text-[var(--primary)] hover:underline">
          Ver caso <ArrowRight size={14} />
        </Link>
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]">
            Código
          </a>
        )}
        {project.demoUrl && (
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)]">
            <ExternalLink size={14} /> Demo
          </a>
        )}
      </div>
    </article>
  );
}

function GithubCard({ repo }: { repo: GithubRepo }) {
  return (
    <a 
      href={repo.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="card hover:border-[var(--primary)] transition-colors block"
    >
      <div className="flex items-center gap-2 mb-2">
        <Github className="w-4 h-4" />
        <h3 className="font-semibold text-sm truncate">{repo.name}</h3>
      </div>
      <p className="text-xs text-[var(--muted)] mb-3 line-clamp-2">{repo.description || "Sin descripción"}</p>
      <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
        {repo.language && <span>{repo.language}</span>}
        {repo.stars > 0 && <span>★ {repo.stars}</span>}
      </div>
    </a>
  );
}