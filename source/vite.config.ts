import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
// One self-contained index.html (JS, CSS and fonts inlined) + the /assets photo folder.
// Opens by double-clicking — no server needed — and uploads as-is to Netlify / Vercel / GitHub Pages.
export default defineConfig({ base: "./", plugins: [react(), viteSingleFile()] });
