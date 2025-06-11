import { createFileRoute } from "@tanstack/react-router";
import Contact from "../pages/Contact.tsx";
import { Layout } from "../components/Layout";
import { User, MessageSquare, Send, HelpCircle } from "lucide-react";

const sections = [
  { id: "intro", title: "Introduction", icon: User },
  { id: "contact-info", title: "Informations", icon: MessageSquare },
  { id: "form", title: "Formulaire", icon: Send },
  { id: "faq", title: "FAQ", icon: HelpCircle },
];

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  return (
    <Layout showSectionNav={true} sections={sections}>
      <Contact />
    </Layout>
  );
}
