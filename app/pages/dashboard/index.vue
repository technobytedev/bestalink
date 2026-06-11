<template>
  <div class="p-6 max-w-4xl mx-auto">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-white">Dashboard</h1>
      <p v-if="profile" class="text-sm text-gray-500 mt-0.5">
        bestalink.com/{{ profile.username }}
      </p>
    </div>

    <!-- Stat cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <DashboardStatCard
        label="Page views"
        :value="stats?.totalPageViews ?? 0"
        icon-bg="bg-gold/10"
        :loading="dashStore.loading"
      >
        <template #icon>
          <svg class="w-5 h-5 text-gold" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
            <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41z" clip-rule="evenodd" />
          </svg>
        </template>
      </DashboardStatCard>

      <DashboardStatCard
        label="Total clicks"
        :value="stats?.totalClicks ?? 0"
        icon-bg="bg-blue-400/10"
        :loading="dashStore.loading"
      >
        <template #icon>
          <svg class="w-5 h-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clip-rule="evenodd" />
          </svg>
        </template>
      </DashboardStatCard>

      <DashboardStatCard
        label="Active links"
        :value="stats?.totalLinks ?? 0"
        icon-bg="bg-green-400/10"
        :loading="dashStore.loading"
      >
        <template #icon>
          <svg class="w-5 h-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
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

    <!-- Quick actions -->
    <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
      <NuxtLink to="/dashboard/links" class="card flex items-center gap-3 hover:border-gold/30 transition-colors cursor-pointer group">
        <div class="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
          <svg class="w-4 h-4 text-gold" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-200">Add a link</p>
          <p class="text-xs text-gray-500">Manage your affiliate links</p>
        </div>
      </NuxtLink>

      <NuxtLink v-if="profile" :to="`/${profile.username}`" target="_blank" class="card flex items-center gap-3 hover:border-gold/30 transition-colors cursor-pointer group">
        <div class="w-9 h-9 rounded-lg bg-blue-400/10 flex items-center justify-center group-hover:bg-blue-400/20 transition-colors">
          <svg class="w-4 h-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clip-rule="evenodd" />
            <path fill-rule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clip-rule="evenodd" />
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-200">View your page</p>
          <p class="text-xs text-gray-500">bestalink.com/{{ profile.username }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ['auth', 'onboarding'], ssr: false })

const profileStore = useProfileStore()
const dashStore = useDashboardStore()
const session = useSupabaseSession()
const { profile } = storeToRefs(profileStore)
const { stats } = storeToRefs(dashStore)

onMounted(async () => {
  await profileStore.fetchProfile()
  if (profile.value && session.value) {
    await dashStore.fetchStats(profile.value.username, session.value?.user?.id ?? '')
  }
})
</script>
