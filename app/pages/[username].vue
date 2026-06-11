<template>
  <div
    class="min-h-screen flex flex-col items-center px-4 py-12"
    :style="{ backgroundColor: profile.bg_color }"
  >
    <div class="w-full max-w-sm">
      <!-- Profile header -->
      <div class="text-center mb-8">
        <img
          v-if="user_avatar"
          :src="user_avatar"
          class="w-20 h-20 rounded-full mx-auto mb-3 ring-4"
          :style="{ outlineColor: profile.brand_color }"
        />
        <div
          v-else
          class="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl font-bold"
          :style="{ backgroundColor: profile.brand_color + '30', color: profile.brand_color }"
        >
          {{ (profile.username?.[0] ?? '?').toUpperCase() }}
        </div>
        <h1 class="text-xl font-bold text-white">{{ display_name || profile.username }}</h1>
        <p class="text-sm text-gray-400 mt-0.5">@{{ profile.username }}</p>
      </div>

      <!-- Links -->
      <div class="space-y-3">
        <NuxtLink
          v-for="link in links"
          :key="link.id"
          :to="`/go/${link.id}`"
          external
          class="block w-full rounded-xl overflow-hidden transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
          :style="{ boxShadow: `0 2px 16px ${profile.brand_color}22` }"
        >
          <!-- Card with thumbnail -->
          <div v-if="link.thumbnail_url" class="flex items-center gap-0 bg-white/5 border rounded-xl overflow-hidden border-white/10">
            <img
              :src="link.thumbnail_url"
              class="w-20 h-20 object-cover shrink-0"
              @error="(e) => ((e.target as HTMLImageElement).style.display = 'none')"
            />
            <div
              class="flex-1 flex items-center justify-between px-4 py-3 min-w-0"
              :style="{ backgroundColor: profile.brand_color, color: getContrastColor(profile.brand_color) }"
            >
              <span class="font-semibold text-sm leading-snug line-clamp-2">{{ link.title }}</span>
              <svg class="w-4 h-4 shrink-0 ml-3 opacity-70" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clip-rule="evenodd" />
                <path fill-rule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>

          <!-- Plain button (no thumbnail) -->
          <div
            v-else
            class="flex items-center justify-between w-full px-5 py-4 rounded-xl font-semibold text-sm"
            :style="{ backgroundColor: profile.brand_color, color: getContrastColor(profile.brand_color) }"
          >
            <span>{{ link.title }}</span>
            <svg class="w-4 h-4 opacity-70" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clip-rule="evenodd" />
              <path fill-rule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clip-rule="evenodd" />
            </svg>
          </div>
        </NuxtLink>
      </div>

      <!-- Empty state -->
      <div v-if="links.length === 0" class="text-center py-8">
        <p class="text-gray-500 text-sm">No links yet.</p>
      </div>

      <!-- Powered by -->
      <div class="text-center mt-10">
        <NuxtLink to="/" class="text-xs text-gray-600 hover:text-gray-400 transition-colors">
          Powered by <span class="text-gold">Bestalink</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface PublicProfile {
  username: string
  bg_color: string
  brand_color: string
  user_id: string
  is_active: boolean
}

interface PublicLink {
  id: string
  title: string
  url: string
  thumbnail_url: string | null
}

interface PageData {
  profile: PublicProfile
  links: PublicLink[]
  display_name: string | null
  user_avatar: string | null
}

definePageMeta({ layout: false })

const route = useRoute()
const username = route.params.username as string

const supabase = useSupabaseClient()

const { data } = await useAsyncData<PageData | null>(`profile-${username}`, async () => {
  const profileRes = await (supabase as any)
    .from('profiles')
    .select('username, bg_color, brand_color, user_id, is_active')
    .eq('username', username)
    .single()

  const profile = profileRes.data as PublicProfile | null

  if (!profile || !profile.is_active) return null

  const linksRes = await (supabase as any)
    .from('links')
    .select('id, title, url, thumbnail_url')
    .eq('user_id', profile.user_id)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  return {
    profile,
    links: (linksRes.data || []) as PublicLink[],
    display_name: null,
    user_avatar: null,
  }
})

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

const { profile, links, display_name, user_avatar } = data.value as PageData

onMounted(async () => {
  await $fetch('/api/track-view', { method: 'POST', body: { username } })
})

function getContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#000000' : '#ffffff'
}

useSeoMeta({
  title: `@${username} | Bestalink`,
  ogTitle: `@${username} | Bestalink`,
  description: `Check out ${username}'s affiliate links on Bestalink.`,
})
</script>
