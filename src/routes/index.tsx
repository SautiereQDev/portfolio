import { createFileRoute } from "@tanstack/react-router";
import Home from "../pages/Home.tsx";
import { Layout } from "../components/Layout";
import { House, Star, Briefcase } from "lucide-react";

const sections = [
  { id: "hero", title: "Accueil", icon: House },
  { id: "features", title: "Compétences", icon: Star },
  { id: "services", title: "Services", icon: Briefcase },
];

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <Layout showSectionNav={true} sections={sections}>
      <Home />
    </Layout>
  );
}
