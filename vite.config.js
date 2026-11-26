import react from '@vitejs/plugin-react'
import { cwd, env } from 'node:process'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const ambiente = loadEnv(mode, cwd(), '')
  const credenciaisTeste = {
    login: env.BOOTSTRAP_ADMIN_LOGIN || ambiente.BOOTSTRAP_ADMIN_LOGIN
      || ambiente.VITE_TEST_LOGIN || 'admin@aerogym.local',
    senha: env.VITE_TEST_PASSWORD || ambiente.VITE_TEST_PASSWORD || 'SenhaSuperForte',
  }

  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_TEST_CREDENTIALS': JSON.stringify(credenciaisTeste),
    },
    server: {
      proxy: {
        '/api': 'http://localhost:8080',
      },
    },
  }
})
