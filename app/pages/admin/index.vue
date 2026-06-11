<template>
  <div class="p-6 max-w-5xl mx-auto">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-white">Admin Panel</h1>
      <p class="text-sm text-gray-500 mt-0.5">{{ users.length }} total users</p>
    </div>

    <!-- Search -->
    <div class="mb-4">
      <input v-model="search" class="input max-w-xs" placeholder="Search by username..." />
    </div>

    <!-- Table -->
    <div class="card overflow-hidden p-0">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-surface-border">
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Username</th>
              <th class="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Links</th>
              <th class="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Views</th>
              <th class="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Clicks</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
              <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="8" class="px-4 py-10 text-center text-gray-500">Loading...</td>
            </tr>
            <tr
              v-else
              v-for="u in filteredUsers"
              :key="u.id"
              class="border-b border-surface-border last:border-0 hover:bg-surface-raised transition-colors"
            >
              <td class="px-4 py-3">
                <div class="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs font-bold">
                  {{ u.username[0].toUpperCase() }}
                </div>
              </td>
              <td class="px-4 py-3">
                <NuxtLink :to="`/${u.username}`" target="_blank" class="text-gold hover:underline font-medium">
                  @{{ u.username }}
                </NuxtLink>
              </td>
              <td class="px-4 py-3 text-right text-gray-300">{{ u.link_count }}</td>
              <td class="px-4 py-3 text-right text-gray-300">{{ u.page_view_count }}</td>
              <td class="px-4 py-3 text-right text-gray-300">{{ u.total_clicks }}</td>
              <td class="px-4 py-3 text-gray-500 text-xs">{{ formatDate(u.created_at) }}</td>
              <td class="px-4 py-3">
                <span :class="u.is_active ? 'badge-active' : 'badge-inactive'">
                  {{ u.is_active ? 'Active' : 'Suspended' }}
                </span>
              </td>
              <td class="px-4 py-3">
                <button
                  class="text-xs px-2 py-1 rounded border transition-colors"
                  :class="u.is_active
                    ? 'border-red-800 text-red-400 hover:bg-red-400/10'
                    : 'border-green-800 text-green-400 hover:bg-green-400/10'"
                  @click="toggleUserStatus(u)"
                >
                  {{ u.is_active ? 'Suspend' : 'Restore' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ['auth', 'admin'], ssr: false })

const supabase = useSupabaseClient()
const loading = ref(true)
const search = ref('')

interface AdminUser {
  id: string
  user_id: string
  username: string
  created_at: string
  is_active: boolean
  link_count: number
  page_view_count: number
  total_clicks: number
}

const users = ref<AdminUser[]>([])

const filteredUsers = computed(() =>
  users.value.filter(u => u.username.includes(search.value.toLowerCase()))
)

onMounted(async () => {
  // Fetch all profiles
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, user_id, username, created_at, is_active')
    .order('created_at', { ascending: false })

  if (!profiles) { loading.value = false; return }

  // Fetch link counts and clicks for each user
  const enriched = await Promise.all(profiles.map(async (p) => {
    const [{ count: link_count }, { data: links }, { count: page_view_count }] = await Promise.all([
      supabase.from('links').select('id', { count: 'exact', head: true }).eq('user_id', p.user_id),
      supabase.from('links').select('click_count').eq('user_id', p.user_id),
      supabase.from('page_views').select('id', { count: 'exact', head: true }).eq('username', p.username),
    ])

    const total_clicks = (links || []).reduce((sum, l) => sum + (l.click_count || 0), 0)

    return {
      ...p,
      link_count: link_count || 0,
      total_clicks,
      page_view_count: page_view_count || 0,
    }
  }))

  users.value = enriched
  loading.value = false
})

async function toggleUserStatus(u: AdminUser) {
  const { error } = await supabase
    .from('profiles')
    .update({ is_active: !u.is_active })
    .eq('id', u.id)

  if (!error) {
    u.is_active = !u.is_active
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>
