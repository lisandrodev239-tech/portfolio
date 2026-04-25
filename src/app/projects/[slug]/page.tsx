import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/config/projects";
import { ArrowLeft, ExternalLink, Calendar, CheckCircle, Star, Code } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  
  if (!project) return { title: "Proyecto no encontrado" };
  
  return {
    title: `${project.title} | Lisandro Dev`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);

  if (!project) notFound();

  const statusLabels: Record<string, string> = {
    completado: "Completado",
    "en-progreso": "En Progreso",
    planificado: "Planificado",
  };

  return (
    <div className="section">
      <Link href="/projects" className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] mb-6">
        <ArrowLeft size={18} /> Volver a proyectos
      </Link>

      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl font-bold">{project.title}</h1>
            {project.featured && <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />}
          </div>
          <p className="text-lg text-[var(--muted)] mb-6">{project.description}</p>
          
          <div className="flex flex-wrap gap-4 mb-6">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2">
                <ExternalLink size={18} /> Ver Demo
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center gap-2">
                <Code size={18} /> Ver Código
              </a>
            )}
          </div>

          <div className="flex gap-6 text-sm text-[var(--muted)]">
            <span className="flex items-center gap-2">
              <Calendar size={16} /> {project.year}
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle size={16} /> {statusLabels[project.status]}
            </span>
            <span className="text-[var(--primary)] font-medium">{project.percentage}% completo</span>
          </div>
        </header>

        <div className="aspect-video bg-[var(--secondary)] rounded-xl mb-8 flex items-center justify-center overflow-hidden">
          {project.image ? (
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
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

        <section className="card">
          <h2 className="text-xl font-semibold mb-4">Acerca de este proyecto</h2>
          <p className="text-[var(--muted)]">
            Este proyecto fue desarrollado utilizando las tecnologías mencionadas arriba. 
            {project.demoUrl && " Puedes ver el demo en vivo."}
            {project.githubUrl && " El código fuente está disponible en GitHub."}
          </p>
        </section>
      </article>
    </div>
  );
}