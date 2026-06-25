import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Plain Vite + TanStack Start + Nitro setup (no host-specific plugin baked in).
// Nitro auto-detects the deploy target at build time — on Vercel it picks the
// `vercel` preset automatically (via the VERCEL env var Vercel's builders set),
// so this same config also works unchanged for Netlify, Node, Docker, etc.
// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR
// error wrapper that renders a branded error page instead of a raw 500).
export default defineConfig({
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      server: { entry: "server" },
    }),
    viteReact(),
    nitro(),
  ],
});
