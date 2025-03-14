import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Eksamen-Web-utvikling-H23", // Må matche "homepage" i package.json
});
