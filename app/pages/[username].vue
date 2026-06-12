<template>
  <div
    class="min-h-screen flex flex-col items-center px-4 py-12 lg:px-8"
    :style="{ backgroundColor: profile.bg_color }"
  >
    <div class="w-full max-w-sm lg:max-w-5xl">
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
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <NuxtLink
          v-for="link in links"
          :key="link.id"
          :to="`/go/${link.id}`"
          external
          class="flex flex-col rounded-2xl overflow-hidden transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
          :style="{ backgroundColor: profile.brand_color, boxShadow: `0 4px 20px ${profile.brand_color}33` }"
        >
          <!-- Thumbnail -->
          <div class="w-full aspect-square overflow-hidden flex items-center justify-center"
            :style="{ backgroundColor: link.thumbnail_url ? '#fff' : getContrastColor(profile.brand_color) === '#000000' ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)' }"
          >
            <img
              v-if="link.thumbnail_url"
              :src="link.thumbnail_url"
              class="w-full h-full object-cover"
              @error="(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).nextElementSibling!.classList.remove('hidden') }"
            />
            <svg
              :class="link.thumbnail_url ? 'hidden' : ''"
              class="w-12 h-12 opacity-40"
              :style="{ color: getContrastColor(profile.brand_color) }"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
          </div>

          <!-- Title + icon -->
          <div
            class="flex items-center justify-between gap-2 px-4 py-3"
            :style="{ color: getContrastColor(profile.brand_color) }"
          >
            <span class="font-semibold text-sm leading-snug line-clamp-2">{{ link.title }}</span>
            <svg class="w-4 h-4 shrink-0 opacity-70" viewBox="0 0 20 20" fill="currentColor">
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
