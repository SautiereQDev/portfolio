import { createFileRoute } from "@tanstack/react-router";
import about from "../pages/About.tsx";

export const Route = createFileRoute("/about")({
  component: about,
});

const About = () => {
  return <About />;
};
