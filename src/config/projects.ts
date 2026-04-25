export interface Project {
  title: string;
  slug: string;
  description: string;
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  status: "completado" | "en-progreso" | "planificado";
  percentage: number;
  technologies: string[];
  year: number;
  featured: boolean;
}

export const projects: Project[] = [
  {
    title: "Dashboard Administrativo para Restaurant",
    slug: "dashboard-restaurant",
    description: "Sistema de gestión integral para restaurant con módulos de inventario, ventas, empleados y reportes en tiempo real.",
    image: "",
    demoUrl: "",
    githubUrl: "",
    status: "completado",
    percentage: 100,
    technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    year: 2025,
    featured: true,
  },
  {
    title: "Landing Page - Clínica Dental",
    slug: "landing-clinica",
    description: "Página de captación para clínica dental con sistema de citas online y formulario de contacto.",
    image: "",
    demoUrl: "",
    githubUrl: "",
    status: "completado",
    percentage: 100,
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    year: 2025,
    featured: true,
  },
  {
    title: "E-commerce Tienda Online",
    slug: "ecommerce-tienda",
    description: "Tienda online completa con catálogo de productos, carrito de compras y pasarela de pago.",
    image: "",
    demoUrl: "",
    githubUrl: "",
    status: "completado",
    percentage: 100,
    technologies: ["React", "Node.js", "MySQL"],
    year: 2024,
    featured: false,
  },
  {
    title: "Sistema de Inventario PyME",
    slug: "sistema-inventario",
    description: "Sistema de gestión de inventario para pequeñas empresas con control de stock y alertas.",
    image: "",
    demoUrl: "",
    githubUrl: "",
    status: "completado",
    percentage: 100,
    technologies: ["PHP", "MySQL", "HTML", "CSS"],
    year: 2024,
    featured: false,
  },
];

export function addProject(project: Project) {
  const exists = projects.find(p => p.slug === project.slug);
  if (exists) {
    Object.assign(exists, project);
  } else {
    projects.push(project);
  }
}

export function removeProject(slug: string) {
  const index = projects.findIndex(p => p.slug === slug);
  if (index > -1) {
    projects.splice(index, 1);
  }
}
