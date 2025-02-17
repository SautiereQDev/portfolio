import { createFileRoute } from "@tanstack/react-router";
import projects from "../pages/Projects.tsx";

export const Route = createFileRoute("/projects")({
  component: projects,
});

const Projects = () => {
  return <Projects />;
};
