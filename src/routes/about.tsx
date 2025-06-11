import { createFileRoute } from "@tanstack/react-router";
import About from "../pages/About.tsx";
import { Layout } from "../components/Layout";
import { User, GraduationCap, Star, Heart } from "lucide-react";

const sections = [
  { id: "intro", title: "Introduction", icon: User },
  { id: "stats", title: "Statistiques", icon: Star },
  { id: "profile", title: "Profil", icon: User },
  { id: "education", title: "Formation", icon: GraduationCap },
  { id: "skills", title: "Compétences", icon: Star },
  { id: "interests", title: "Passions", icon: Heart },
];

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <Layout showSectionNav={true} sections={sections}>
      <About />
    </Layout>
  );
}
