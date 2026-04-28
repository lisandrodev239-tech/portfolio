import { Metadata } from "next";
import ProjectsList from "./projects-list";

export const metadata: Metadata = {
  title: "Proyectos | Lisandro Dev",
  description: "Explora mis proyectos de desarrollo web, dashboards y sistemas.",
};

export default function ProjectsPage() {
  return <ProjectsList />;
}