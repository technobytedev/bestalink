<template>
  <div class="min-h-screen bg-background flex flex-col">
    <!-- Nav -->
    <header class="flex items-center justify-between px-6 h-16 border-b border-surface-border">
      <div class="flex items-center gap-1">
        <span class="text-2xl font-bold text-gold">Besta</span>
        <span class="text-2xl font-bold text-white">link</span>
      </div>
      <button class="btn-primary" @click="signIn" :disabled="loading">
        <svg v-if="loading" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        Sign in with Google
      </button>
    </header>

    <!-- Hero -->
    <main class="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 animate-slide-up">
      <!-- Gold glow orb -->
      <div class="w-32 h-32 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-8 shadow-[0_0_80px_rgba(201,168,76,0.15)]">
        <div class="w-20 h-20 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center">
          <svg class="w-8 h-8 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
          </svg>
        </div>
      </div>

      <h1 class="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
        Your links,<br>
        <span class="text-gold">beautifully</span> shared.
      </h1>

      <p class="text-lg text-gray-400 max-w-md mb-10">
        Create your personal affiliate link page in minutes. Share all your products from one sleek, branded URL.
      </p>

      <button class="btn-primary text-base px-8 py-3 shadow-[0_0_30px_rgba(201,168,76,0.2)]" @click="signIn" :disabled="loading">
        <svg class="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#fff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#fff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#fff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Get started free
      </button>

      <p class="mt-4 text-sm text-gray-600">No credit card required</p>
    </main>

    <!-- Feature pills -->
    <section class="pb-16 px-4">
      <div class="flex flex-wrap gap-3 justify-center max-w-xl mx-auto">
        <FeaturePill v-for="f in features" :key="f" :label="f" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const supabase = useSupabaseClient()
const loading = ref(false)
const config = useRuntimeConfig()

const features = [
  'Custom username URL',
  'Branded colors',
  'Link analytics',
  'Up to 50 links',
  'Google Sign In',
]

async function signIn() {
  loading.value = true
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${config.public.appUrl}/auth/callback`,
    },
  })
  if (error) {
    console.error(error)
    loading.value = false
  }
}
</script>
