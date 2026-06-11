export default defineNuxtRouteMiddleware(async () => {
  // Skip on server — session.user is stripped by @nuxtjs/supabase on SSR.
  if (import.meta.server) return

  const session = useSupabaseSession()
  const supabase = useSupabaseClient()

  const uid = session.value?.user?.id
  if (!uid) {
    return navigateTo('/')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('user_id', uid)
    .single()

  if (profile?.role !== 'admin') {
    return navigateTo('/dashboard')
  }
})
