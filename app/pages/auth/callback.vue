<template>
  <div class="min-h-screen bg-background flex items-center justify-center">
    <div class="text-center">
      <div class="w-12 h-12 rounded-full border-2 border-gold border-t-transparent animate-spin mx-auto mb-4" />
      <p class="text-gray-400 text-sm">Signing you in...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const supabase = useSupabaseClient()
const router = useRouter()

onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    router.push('/')
    return
  }

  // Check if user has a profile already
  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('user_id', session.user.id)
    .single()

  if (!profile?.username) {
    router.push('/onboarding')
  } else {
    router.push('/dashboard')
  }
})
</script>
