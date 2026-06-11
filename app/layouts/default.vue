<template>
  <div class="min-h-screen bg-background flex">
    <!-- Sidebar -->
    <aside class="w-60 shrink-0 border-r border-surface-border flex flex-col">
      <!-- Logo -->
      <div class="h-16 flex items-center px-6 border-b border-surface-border">
        <NuxtLink to="/dashboard" class="flex items-center gap-2">
          <span class="text-xl font-bold text-gold">Besta</span><span class="text-xl font-bold text-white">link</span>
        </NuxtLink>
      </div>

      <!-- Nav -->
      <nav class="flex-1 py-4 px-3 space-y-1">
        <SidebarLink to="/dashboard" icon="chart" label="Dashboard" />
        <SidebarLink to="/dashboard/links" icon="link" label="My Links" />
        <SidebarLink to="/dashboard/settings" icon="settings" label="Settings" />
        <template v-if="isAdmin">
          <div class="pt-4 pb-1 px-3">
            <p class="text-xs font-semibold text-gray-600 uppercase tracking-wider">Admin</p>
          </div>
          <SidebarLink to="/admin" icon="shield" label="Admin Panel" />
        </template>
      </nav>

      <!-- User footer -->
      <div class="p-3 border-t border-surface-border">
        <div class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-raised transition-colors cursor-pointer" @click="handleSignOut">
          <img v-if="session?.user?.user_metadata?.avatar_url" :src="session?.user?.user_metadata?.avatar_url" class="w-8 h-8 rounded-full object-cover" />
          <div v-else class="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm font-bold">
            {{ initials }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-200 truncate">{{ session?.user?.user_metadata?.full_name || 'User' }}</p>
            <p class="text-xs text-gray-500 truncate">Sign out</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main -->
    <main class="flex-1 overflow-auto">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const session = useSupabaseSession()
const router = useRouter()

// Admin check comes from the DB profile, not JWT metadata
const profileStore = useProfileStore()
const { profile } = storeToRefs(profileStore)
const isAdmin = computed(() => profile.value?.role === 'admin')

const initials = computed(() => {
  const name = (session.value?.user?.user_metadata?.full_name as string) || ''
  return name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() || 'U'
})

onMounted(() => profileStore.fetchProfile())

async function handleSignOut() {
  await supabase.auth.signOut()
  router.push('/')
}
</script>
