import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject } from "@/lib/projects";
import { ArrowLeft, ExternalLink, Calendar, CheckCircle } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  
  if (!project) {
    return { title: "Proyecto no encontrado" };
  }
  
  return {
    title: `${project.title} | Lisandro Dev`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const sections = project.content.split("\n## ").slice(1);
  const problem = sections.find((s) => s.startsWith("Problema"))?.replace("Problema\n", "") || "";
  const solucion = sections.find((s) => s.startsWith("Solución"))?.replace("Solución\n", "") || "";
  const stack = sections.find((s) => s.startsWith("Stack"))?.replace("Stack\n", "") || "";
  const decisiones = sections.find((s) => s.startsWith("Decisiones"))?.replace("Decisiones\n", "") || "";
  const resultados = sections.find((s) => s.startsWith("Resultados"))?.replace("Resultados\n", "") || "";

  return (
    <div className="section">
      <Link 
        href="/projects" 
        className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] mb-6"
      >
        <ArrowLeft size={18} /> Volver a proyectos
      </Link>

      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
          <p className="text-lg text-[var(--muted)] mb-6">{project.description}</p>
          
          <div className="flex flex-wrap gap-4 mb-6">
            {project.demoUrl && (
              <a 
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2"
              >
                <ExternalLink size={18} /> Ver Demo
              </a>
            )}
            {project.githubUrl && (
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                Ver Código
              </a>
            )}
          </div>

          <div className="flex gap-4 text-sm text-[var(--muted)]">
            <span className="flex items-center gap-2">
              <Calendar size={16} /> {project.year}
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle size={16} /> {project.status}
            </span>
          </div>
        </header>

        <div className="aspect-video bg-[var(--secondary)] rounded-xl mb-8 flex items-center justify-center overflow-hidden">
          {project.image ? (
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-6xl">🖥️</span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.technologies.map((tech) => (
            <span key={tech} className="px-3 py-1 bg-[var(--secondary)] rounded-full text-sm">
              {tech}
            </span>
          ))}
        </div>

        {problem && (
          <section className="card mb-6">
            <h2 className="text-xl font-semibold mb-4">El Problema</h2>
            <div className="prose prose-sm max-w-none text-[var(--muted)]">
              {problem}
            </div>
          </section>
        )}

        {solucion && (
          <section className="card mb-6">
            <h2 className="text-xl font-semibold mb-4">La Solución</h2>
            <div className="prose prose-sm max-w-none text-[var(--muted)]">
              {solucion}
            </div>
          </section>
        )}

        {stack && (
          <section className="card mb-6">
            <h2 className="text-xl font-semibold mb-4">Stack Utilizado</h2>
            <div className="prose prose-sm max-w-none text-[var(--muted)]">
              {stack}
            </div>
          </section>
        )}

        {decisiones && (
          <section className="card mb-6">
            <h2 className="text-xl font-semibold mb-4">Decisiones Técnicas</h2>
            <div className="prose prose-sm max-w-none text-[var(--muted)]">
              {decisiones}
            </div>
          </section>
        )}

        {resultados && (
          <section className="card">
            <h2 className="text-xl font-semibold mb-4">Resultados</h2>
            <div className="prose prose-sm max-w-none text-[var(--muted)]">
              {resultados}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}