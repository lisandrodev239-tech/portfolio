import matter from "gray-matter";
import fs from "fs";
import path from "path";

export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  status: "completado" | "en-progreso" | "planificado";
  percentage: number;
  technologies: string[];
  year: number;
  clientType?: string;
  featured: boolean;
  content: string;
}

const projectsDirectory = path.join(process.cwd(), "src/content/projects");

export async function getProjects(): Promise<Project[]> {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(projectsDirectory);
  const projects = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(projectsDirectory, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);
      return {
        slug: file.replace(".md", ""),
        title: data.title || "",
        description: data.description || "",
        image: data.image || "",
        demoUrl: data.demoUrl,
        githubUrl: data.githubUrl,
        status: data.status || "completado",
        percentage: data.percentage || 0,
        technologies: data.technologies || [],
        year: data.year || new Date().getFullYear(),
        clientType: data.clientType,
        featured: data.featured || false,
        content,
      } as Project;
    });

  return projects.sort((a, b) => (a.featured ? -1 : 1));
}

export async function getProject(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) || null;
}