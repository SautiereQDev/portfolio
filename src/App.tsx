import { StrictMode } from "react";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Analytics } from "./components/Analytics";

import { routeTree } from "./routeTree.gen";

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    routeTree: typeof routeTree;
  }
}

export function App() {
  return (
    <StrictMode>
      <Analytics />
      <RouterProvider router={router} />
    </StrictMode>
  );
}
