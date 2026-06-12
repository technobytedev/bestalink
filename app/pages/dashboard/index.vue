<template>
  <div class="p-4 sm:p-6 max-w-4xl mx-auto">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-white">Dashboard</h1>
      <p v-if="profile" class="text-sm text-gray-500 mt-0.5">
        bestalink.com/{{ profile.username }}
      </p>
    </div>

    <!-- Stat cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <DashboardStatCard
        label="Total Views"
        :value="stats?.totalPageViews ?? 0"
        icon-bg="bg-gold/10"
        :loading="dashStore.loading"
        :trend="stats?.trends.pageViews ?? null"
      >
        <template #icon>
          <svg class="w-5 h-5 text-gold" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
            <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41z" clip-rule="evenodd" />
          </svg>
        </template>
      </DashboardStatCard>

      <DashboardStatCard
        label="Total Clicks"
        :value="stats?.totalClicks ?? 0"
        icon-bg="bg-blue-400/10"
        :loading="dashStore.loading"
        :trend="stats?.trends.clicks ?? null"
      >
        <template #icon>
          <svg class="w-5 h-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clip-rule="evenodd" />
          </svg>
        </template>
      </DashboardStatCard>

      <DashboardStatCard
        label="Products"
        :value="stats?.totalLinks ?? 0"
        icon-bg="bg-green-400/10"
        :loading="dashStore.loading"
        :trend="stats?.trends.products ?? null"
      >
        <template #icon>
          <svg class="w-5 h-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
          </svg>
        </template>
      </DashboardStatCard>

      <DashboardStatCard
        label="Click Rate"
        :value="stats?.ctr ?? 0"
        suffix="%"
        icon-bg="bg-purple-400/10"
        :loading="dashStore.loading"
        :trend="stats?.trends.ctr ?? null"
      >
        <template #icon>
          <svg class="w-5 h-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
          </svg>
        </template>
      </DashboardStatCard>
    </div>

    <!-- Chart -->
    <DashboardLinkChart
      v-if="stats?.chartData"
      :labels="stats.chartData.labels"
      :page-views="stats.chartData.pageViews"
      :clicks="stats.chartData.clicks"
    />

    <!-- Top Performing Products -->
    <div class="card mt-6">
      <h3 class="text-sm font-semibold text-gray-200 mb-4">Top Performing Products</h3>

      <div v-if="linksStore.loading" class="space-y-4">
        <div v-for="i in 3" :key="i" class="h-10 bg-surface-raised rounded animate-pulse" />
      </div>

      <div v-else-if="topLinks.length" class="space-y-5">
        <div v-for="(link, index) in topLinks" :key="link.id" class="flex items-center gap-3">
          <span class="text-xs text-gray-500 w-3 shrink-0 text-center">{{ index + 1 }}</span>
          <div
            class="w-9 h-9 rounded-lg shrink-0 overflow-hidden flex items-center justify-center text-white text-xs font-bold"
            :class="productBgClass(index)"
          >
            <img v-if="link.thumbnail_url" :src="link.thumbnail_url" class="w-full h-full object-cover" alt="" />
            <span v-else>{{ link.title.charAt(0).toUpperCase() }}</span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm text-gray-200 truncate mb-1.5">{{ link.title }}</p>
            <div class="h-1 bg-surface-raised rounded-full overflow-hidden">
              <div
                class="h-full bg-gold rounded-full transition-all duration-500"
                :style="{ width: maxClicks > 0 ? `${(link.click_count / maxClicks) * 100}%` : '0%' }"
              />
            </div>
          </div>
          <span class="text-xs text-gray-400 shrink-0">{{ link.click_count.toLocaleString() }} clicks</span>
        </div>
      </div>

      <p v-else class="text-sm text-gray-500 text-center py-6">No products yet — <NuxtLink to="/dashboard/links" class="text-gold hover:underline">add your first link</NuxtLink></p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ['auth', 'onboarding'], ssr: false })

const profileStore = useProfileStore()
const dashStore = useDashboardStore()
const linksStore = useLinksStore()
const user = useSupabaseUser()
const { profile } = storeToRefs(profileStore)
const { stats } = storeToRefs(dashStore)
const { links } = storeToRefs(linksStore)

const productBgClasses = ['bg-orange-500', 'bg-purple-500', 'bg-pink-500', 'bg-teal-500', 'bg-indigo-500']
function productBgClass(index: number) {
  return productBgClasses[index % productBgClasses.length]
}

const topLinks = computed(() =>
  [...links.value].sort((a, b) => b.click_count - a.click_count).slice(0, 3)
)

const maxClicks = computed(() =>
  topLinks.value[0]?.click_count ?? 1
)

onMounted(async () => {
  await profileStore.fetchProfile()
  if (profile.value && user.value) {
    await Promise.all([
      dashStore.fetchStats(profile.value.username, user.value.id),
      linksStore.fetchLinks(),
    ])
  }
})
</script>
