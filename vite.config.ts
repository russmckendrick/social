import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
    chunkSizeWarningLimit: 1000
  }
})
