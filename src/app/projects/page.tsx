import { Metadata } from "next";
import Link from "next/link";
import { getProjects } from "@/lib/projects";
import { ArrowRight, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Proyectos | Lisandro Dev",
  description: "Explora mis proyectos de desarrollo web, dashboards y sistemas.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="section">
      <h1 className="section-title">Proyectos</h1>
      
      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[var(--muted)] mb-4">
            Aún no hay proyectos publicados.
          </p>
          <p className="text-sm text-[var(--muted)]">
            Próximamente agregaré casos de estudio.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <article key={project.slug} className="card hover:border-[var(--primary)] transition-colors">
              <div className="aspect-video bg-[var(--secondary)] rounded-lg mb-4 flex items-center justify-center">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-4xl">🖥️</span>
                )}
              </div>
              
              <h2 className="text-lg font-semibold mb-2">{project.title}</h2>
              <p className="text-sm text-[var(--muted)] mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-[var(--secondary)] rounded text-xs">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 h-2 bg-[var(--secondary)] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[var(--primary)] rounded-full"
                    style={{ width: `${project.percentage}%` }}
                  />
                </div>
                <span className="text-xs text-[var(--muted)]">{project.percentage}%</span>
              </div>
              
              <div className="flex gap-3">
                <Link 
                  href={`/projects/${project.slug}`}
                  className="flex items-center gap-1 text-sm text-[var(--primary)] hover:underline"
                >
                  Ver caso <ArrowRight size={14} />
                </Link>
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
                  >
                    Código
                  </a>
                )}
                {project.demoUrl && (
                  <a 
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
                  >
                    <ExternalLink size={14} /> Demo
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}