import { createFileRoute } from "@tanstack/react-router";
import contact from "../pages/Contact.tsx";

export const Route = createFileRoute("/contact")({
  component: contact,
});

const Contact = () => {
  return <Contact />;
};
