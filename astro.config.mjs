// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // ADICIONE ESTA LINHA ABAIXO
  output: 'server', 
  
  integrations: [react(), keystatic()],
  
  // O adaptador da Vercel já está configurado, o que é ótimo!
  adapter: vercel()
});