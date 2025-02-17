import { createFileRoute } from "@tanstack/react-router";
import services from "../pages/Services.tsx";

export const Route = createFileRoute("/services")({
  component: services,
});

const Services = () => {
  return <Services />;
};
