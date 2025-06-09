import { createRootRoute, Outlet } from "@tanstack/react-router";
import Footer from "../components/Footer.tsx";
import PageNavigation from "../components/ui/PageNavigation.tsx";
import React from "react";

// Le tanstack devtool n'apparait qu'en mode développement
const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    );

export const Route = createRootRoute({
  component: () => (
    <div className="select-none">
      <main>
        <Outlet />
      </main>
      <PageNavigation />
      <Footer />
      <TanStackRouterDevtools />
    </div>
  ),
});
