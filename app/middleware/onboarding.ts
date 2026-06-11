export default defineNuxtRouteMiddleware(async (to) => {
  // Skip on server — session.user is stripped by @nuxtjs/supabase on SSR.
  // The client re-runs this middleware on hydration with the full session.
  if (import.meta.server) return

  const session = useSupabaseSession()
  const supabase = useSupabaseClient()

  const uid = session.value?.user?.id
  if (!uid) return

  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('user_id', uid)
    .single()

  if (!profile?.username && to.path !== '/onboarding') {
    return navigateTo('/onboarding')
  }

  if (profile?.username && to.path === '/onboarding') {
    return navigateTo('/dashboard')
  }
})
