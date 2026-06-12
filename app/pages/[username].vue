<template>
  <div
    class="min-h-screen flex flex-col items-center px-4 py-12"
    :style="{ backgroundColor: profile.bg_color }"
  >
    <div class="w-full max-w-4xl">
      <!-- Profile header -->
      <div class="text-center mb-10">
        <img
          v-if="user_avatar"
          :src="user_avatar"
          class="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
        />
        <div
          v-else
          class="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold"
          :style="{ backgroundColor: profile.brand_color }"
        >
          <span :style="{ color: getContrastColor(profile.brand_color) }">
            {{ (profile.username?.[0] ?? '?').toUpperCase() }}
          </span>
        </div>

        <h1 class="text-xl font-bold text-white mb-1">{{ display_name || profile.username }}</h1>
        <p class="text-xs text-gray-500 mt-1">Affiliate links may earn a small commission</p>
      </div>

      <!-- Link cards grid -->
      <div v-if="links.length > 0" class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <NuxtLink
          v-for="(link, i) in links"
          :key="link.id"
          :to="`/go/${link.id}`"
          external
          class="flex flex-col rounded-2xl overflow-hidden transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]"
          style="background-color: #111111;"
        >
          <!-- Gradient / thumbnail area -->
          <div class="relative w-full aspect-square overflow-hidden">
            <img
              v-if="link.thumbnail_url"
              :src="link.thumbnail_url"
              class="w-full h-full object-cover"
              @error="(e) => ((e.target as HTMLImageElement).style.display = 'none')"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center"
              :style="{ background: cardGradient(i) }"
            >
              <svg class="w-16 h-16 text-white/60" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
              </svg>
            </div>
          </div>

          <!-- Card info -->
          <div class="flex flex-col gap-3 p-4">
            <p class="font-bold text-white text-sm leading-snug line-clamp-2">{{ link.title }}</p>
            <div
              class="w-full py-2.5 rounded-lg font-bold text-sm tracking-widest text-center"
              :style="{ backgroundColor: profile.brand_color, color: getContrastColor(profile.brand_color) }"
            >
              SHOP NOW →
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Empty state -->
      <div v-else class="text-center py-8">
        <p class="text-gray-500 text-sm">No links yet.</p>
      </div>

      <!-- Powered by -->
      <div class="text-center mt-12">
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

const GRADIENTS = [
  'linear-gradient(135deg, #F97316 0%, #FBBF24 100%)',
  'linear-gradient(135deg, #7C3AED 0%, #6366F1 100%)',
  'linear-gradient(135deg, #EC4899 0%, #F43F5E 100%)',
  'linear-gradient(135deg, #059669 0%, #10B981 100%)',
  'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
  'linear-gradient(135deg, #DB2777 0%, #F97316 100%)',
]

function cardGradient(index: number): string {
  return GRADIENTS[index % GRADIENTS.length] as string
}

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
