

// https://vitejs.dev/config/
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0', // Ensure it listens on all network interfaces
    port: 5173
  }
});
