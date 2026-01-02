/// <reference types="node" />
import { defineConfig, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { IncomingMessage, ServerResponse } from 'http'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'cors-proxy',
      configureServer(server: ViteDevServer) {
        // Mount middleware specifically on /api/proxy
        server.middlewares.use('/api/proxy', async (req: IncomingMessage, res: ServerResponse) => {
          // req.url here is stripped of '/api/proxy', so it starts with /?url=...
          const urlParam = new URL(req.url || '', `http://${req.headers.host}`).searchParams.get('url');
          if (!urlParam) {
            res.statusCode = 400;
            res.end('Missing url parameter');
            return;
          }

          console.log(`Proxying request to: ${urlParam}`);

          try {
            const fetchRes = await fetch(urlParam);

            // Forward common headers
            res.setHeader('Content-Type', fetchRes.headers.get('content-type') || 'text/plain');
            res.setHeader('Access-Control-Allow-Origin', '*');

            if (!fetchRes.ok) {
              console.error(`Proxy upstream error: ${fetchRes.status}`);
              res.statusCode = fetchRes.status;
              res.end(await fetchRes.text());
              return;
            }

            const buffer = await fetchRes.arrayBuffer();
            res.end(Buffer.from(buffer));
          } catch (error) {
            console.error('Proxy Error:', error);
            res.statusCode = 500;
            res.end('Proxy Error');
          }
        });
      }
    }
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split each icon library into separate chunks for dynamic loading (check first)
          if (id.includes('react-icons/fa')) return 'icons-fa';
          if (id.includes('react-icons/si')) return 'icons-si';
          if (id.includes('react-icons/tb')) return 'icons-tb';
          if (id.includes('react-icons/ri')) return 'icons-ri';
          if (id.includes('react-icons/md')) return 'icons-md';
          if (id.includes('react-icons')) return 'icons-other';

          // Separate React vendor bundle
          if (id.includes('node_modules/react') && !id.includes('react-icons')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }

          // Separate Framer Motion
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-motion';
          }

          // Other vendor dependencies
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 5000 // Icon libraries are large but dynamically loaded
  }
})
