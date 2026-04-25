import Link from "next/link";
import { ArrowRight, Code, LayoutDashboard, Package, Settings } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Desarrollo Web <span className="text-[var(--primary)]">Profesional</span>
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto mb-8">
          Construyo soluciones web personalizadas para PyMEs y emprendedores. 
          landing pages, dashboards administrativos y sistemas de gestión que impulsan tu negocio.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/projects" className="btn-primary flex items-center gap-2">
            Ver proyectos <ArrowRight size={18} />
          </Link>
          <Link href="/contact" className="btn-secondary">
            Contactar
          </Link>
        </div>
      </section>

      {/* Servicios */}
      <section className="section bg-[var(--secondary)]">
        <h2 className="section-title">Servicios</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card text-center">
            <LayoutDashboard className="w-10 h-10 mx-auto mb-4 text-[var(--primary)]" />
            <h3 className="font-semibold mb-2">Landing Pages</h3>
            <p className="text-sm text-[var(--muted)]">
              Páginas de captación profesionales diseñadas para convertir visitantes en clientes.
            </p>
          </div>
          <div className="card text-center">
            <Code className="w-10 h-10 mx-auto mb-4 text-[var(--primary)]" />
            <h3 className="font-semibold mb-2">Sitios Web</h3>
            <p className="text-sm text-[var(--muted)]">
              Presencia digital completa para tu negocio con diseño profesional y responsive.
            </p>
          </div>
          <div className="card text-center">
            <Settings className="w-10 h-10 mx-auto mb-4 text-[var(--primary)]" />
            <h3 className="font-semibold mb-2">Dashboards</h3>
            <p className="text-sm text-[var(--muted)]">
              Sistemas administrativos para gestionar tu negocio desde cualquier lugar.
            </p>
          </div>
          <div className="card text-center">
            <Package className="w-10 h-10 mx-auto mb-4 text-[var(--primary)]" />
            <h3 className="font-semibold mb-2">Sistemas</h3>
            <p className="text-sm text-[var(--muted)]">
              Gestores de inventario, CRM y automatización de procesos para PyMEs.
            </p>
          </div>
        </div>
      </section>

      {/* Tecnologías */}
      <section className="section">
        <h2 className="section-title">Tecnologías</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {["Next.js", "TypeScript", "React", "Tailwind CSS", "Supabase", "PostgreSQL", "Node.js"].map((tech) => (
            <span key={tech} className="px-4 py-2 bg-[var(--secondary)] rounded-full text-sm font-medium">
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="section text-center bg-[var(--secondary)]">
        <h2 className="text-2xl font-bold mb-4">¿Listo para impulsar tu negocio?</h2>
        <p className="text-[var(--muted)] mb-6">
          Hablemos sobre tu proyecto y encontremos la mejor solución juntos.
        </p>
        <Link href="/contact" className="btn-primary">
          Contáctame
        </Link>
      </section>
    </div>
  );
}