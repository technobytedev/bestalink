<template>
  <div class="h-screen bg-background flex flex-col">

    <!-- Mobile top header -->
    <header class="lg:hidden flex items-center justify-between px-4 h-14 border-b border-surface-border shrink-0 bg-background z-40">
      <NuxtLink to="/dashboard" class="flex items-center">
        <span class="text-lg font-bold text-gold">Besta</span>
        <span class="text-lg font-bold text-white">link</span>
      </NuxtLink>
      <img
        v-if="session?.user?.user_metadata?.avatar_url"
        :src="session?.user?.user_metadata?.avatar_url"
        class="w-8 h-8 rounded-full object-cover"
      />
      <div v-else class="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm font-bold">
        {{ initials }}
      </div>
    </header>

    <!-- Sidebar + main row -->
    <div class="flex flex-1 min-h-0">

      <!-- Sidebar (desktop only) -->
      <aside class="hidden lg:flex w-60 shrink-0 border-r border-surface-border flex-col">
        <!-- Logo -->
        <div class="h-16 flex items-center px-6 border-b border-surface-border">
          <NuxtLink to="/dashboard" class="flex items-center">
            <span class="text-xl font-bold text-gold">Besta</span><span class="text-xl font-bold text-white">link</span>
          </NuxtLink>
        </div>

        <!-- Nav -->
        <nav class="flex-1 py-4 px-3 space-y-1">
          <LayoutSidebarLink to="/dashboard" icon="chart" label="Dashboard" />
          <LayoutSidebarLink to="/dashboard/links" icon="link" label="My Links" />
          <LayoutSidebarLink to="/dashboard/settings" icon="settings" label="Settings" />
          <template v-if="isAdmin">
            <div class="pt-4 pb-1 px-3">
              <p class="text-xs font-semibold text-gray-600 uppercase tracking-wider">Admin</p>
            </div>
            <LayoutSidebarLink to="/admin" icon="shield" label="Admin Panel" />
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

      <!-- Main content -->
      <main class="flex-1 overflow-y-auto pb-16 lg:pb-0">
        <slot />
      </main>
    </div>

    <!-- Mobile bottom nav -->
    <nav class="lg:hidden fixed bottom-0 inset-x-0 z-50 flex items-center border-t border-surface-border bg-background">
      <NuxtLink
        to="/dashboard"
        class="flex-1 flex flex-col items-center justify-center py-3 gap-0.5 text-gray-500 transition-colors"
        :class="route.path === '/dashboard' ? 'text-gold' : 'hover:text-gray-300'"
      >
        <ChartBarIcon class="w-5 h-5" />
        <span class="text-[10px] font-medium">Dashboard</span>
      </NuxtLink>

      <NuxtLink
        to="/dashboard/links"
        class="flex-1 flex flex-col items-center justify-center py-3 gap-0.5 text-gray-500 transition-colors"
        :class="route.path.startsWith('/dashboard/links') ? 'text-gold' : 'hover:text-gray-300'"
      >
        <LinkIcon class="w-5 h-5" />
        <span class="text-[10px] font-medium">Links</span>
      </NuxtLink>

      <NuxtLink
        to="/dashboard/settings"
        class="flex-1 flex flex-col items-center justify-center py-3 gap-0.5 text-gray-500 transition-colors"
        :class="route.path.startsWith('/dashboard/settings') ? 'text-gold' : 'hover:text-gray-300'"
      >
        <Cog6ToothIcon class="w-5 h-5" />
        <span class="text-[10px] font-medium">Settings</span>
      </NuxtLink>

      <button
        class="flex-1 flex flex-col items-center justify-center py-3 gap-0.5 text-gray-500 hover:text-gray-300 transition-colors"
        @click="handleSignOut"
      >
        <ArrowRightOnRectangleIcon class="w-5 h-5" />
        <span class="text-[10px] font-medium">Sign out</span>
      </button>
    </nav>

  </div>
</template>

<script setup lang="ts">
import {
  ChartBarIcon,
  LinkIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/vue/24/outline'

const supabase = useSupabaseClient()
const session = useSupabaseSession()
const router = useRouter()
const route = useRoute()

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
