export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
  ],

  supabase: {
    redirectOptions: {
      login: '/',
      callback: '/auth/callback',
      include: ['/dashboard(/*)?', '/onboarding', '/admin(/*)?'],
    },
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY,
    public: {
      appUrl: process.env.APP_URL || 'http://localhost:3000',
      supabaseUrl: process.env.SUPABASE_URL,
    },
  },
})
