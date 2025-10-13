import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: true,
    hmr: {
      clientPort: 443,
      protocol: "wss",
    },
    proxy: {
      '/api/proxy-noticias': {
        target: 'https://www.api.neext.online',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/proxy-noticias/, '/api/noticias'),
      },
      '/api/proxy-hentai': {
        target: 'https://www.api.neext.online',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/proxy-hentai/, '/api/hentai'),
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
