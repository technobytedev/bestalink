export default defineNuxtRouteMiddleware(() => {
  const session = useSupabaseSession()

  // session.value is non-null when authenticated (user property is stripped on SSR
  // by @nuxtjs/supabase but the session object itself is present)
  if (!session.value) {
    return navigateTo('/')
  }
})
