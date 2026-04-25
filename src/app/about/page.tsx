import { Metadata } from "next";
import { Code, GraduationCap, Briefcase, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre mí | Lisandro Dev",
  description: "Conoce mi formación, tecnologías y metodología de trabajo.",
};

export default function AboutPage() {
  return (
    <div className="section">
      <h1 className="section-title">Sobre Mí</h1>
      
      <div className="max-w-3xl mx-auto">
        <div className="card mb-8">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
            <Target className="w-5 h-5 text-[var(--primary)]" />
            Propuesta de Valor
          </h2>
          <p className="text-[var(--muted)]">
            Me especializo en construir soluciones web profesionales para PyMEs y emprendedores. 
            Mi enfoque está en crear sistemas de gestión, dashboards administrativos y landing pages 
            que generan resultados reales para tu negocio. No solo entrego código, entrego herramientas 
            que funcionan.
          </p>
        </div>

        <div className="card mb-8">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
            <Briefcase className="w-5 h-5 text-[var(--primary)]" />
            Enfoque Profesional
          </h2>
          <ul className="space-y-2 text-[var(--muted)]">
            <li>• Desarrollo orientado a resultados de negocio</li>
            <li>• Código limpio y mantenible</li>
            <li>• Comunicación clara y profesional</li>
            <li>• Entregas dentro del plazo acordado</li>
            <li>• Soporte post-entrega incluido</li>
          </ul>
        </div>

        <div className="card mb-8">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
            <Code className="w-5 h-5 text-[var(--primary)]" />
            Tecnologías
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Next.js",
              "TypeScript",
              "React",
              "Tailwind CSS",
              "Supabase",
              "PostgreSQL",
              "Node.js",
              "HTML",
              "CSS",
              "JavaScript",
              "PHP",
              "MySQL",
            ].map((tech) => (
              <span key={tech} className="px-3 py-1 bg-[var(--secondary)] rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
            <GraduationCap className="w-5 h-5 text-[var(--primary)]" />
            Formación
          </h2>
          <ul className="space-y-3 text-[var(--muted)]">
            <li>
              <strong>Estudiante de Ingeniería Informática</strong>
              <br />
              <span className="text-sm">Universidad - Actualmente</span>
            </li>
            <li>
              <strong>Técnico en Programación</strong>
              <br />
              <span className="text-sm">Formación técnica - Completado</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}