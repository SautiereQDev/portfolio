/// <reference types="vite/client" />

// SVG imports with ?react suffix for vite-plugin-svgr
declare module "*.svg?react" {
  import * as React from "react";
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

// Regular SVG imports
declare module "*.svg" {
  const src: string;
  export default src;
}
