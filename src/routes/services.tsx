import { createFileRoute } from "@tanstack/react-router";
import Services from "../pages/Services.tsx";
import { Layout } from "../components/Layout";
import { Briefcase, Target, Settings, Wrench, ArrowRight } from "lucide-react";

const sections = [
  { id: "intro", title: "Introduction", icon: Briefcase },
  { id: "pricing", title: "Tarifs", icon: Target },
  { id: "process", title: "Processus", icon: Settings },
  { id: "additional", title: "Services supplémentaires", icon: Wrench },
  { id: "contact", title: "Contact", icon: ArrowRight },
];

export const Route = createFileRoute("/services")({
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <Layout showSectionNav={true} sections={sections}>
      <Services />
    </Layout>
  );
}
