import { createFileRoute } from "@tanstack/react-router";
import Projects from "../pages/Projects.tsx";
import { Layout } from "../components/Layout";
import { FolderOpen, Filter, Grid } from "lucide-react";

const sections = [
  { id: "intro", title: "Introduction", icon: FolderOpen },
  { id: "filters", title: "Filtres", icon: Filter },
  { id: "projects", title: "Projets", icon: Grid },
];

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <Layout showSectionNav={true} sections={sections}>
      <Projects />
    </Layout>
  );
}
