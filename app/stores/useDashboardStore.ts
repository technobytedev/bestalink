import { defineStore } from 'pinia'

export interface DashboardStats {
  totalPageViews: number
  totalClicks: number
  totalLinks: number
  chartData: {
    labels: string[]
    pageViews: number[]
    clicks: number[]
  }
}

export const useDashboardStore = defineStore('dashboard', () => {
  const supabase = useSupabaseClient()

  const stats = ref<DashboardStats | null>(null)
  const loading = ref(false)

  async function fetchStats(username: string, userId: string) {
    loading.value = true

    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const since = thirtyDaysAgo.toISOString()

    const [pageViewsRes, linksRes] = await Promise.all([
      supabase
        .from('page_views')
        .select('viewed_at')
        .eq('username', username)
        .gte('viewed_at', since),
      supabase
        .from('links')
        .select('click_count')
        .eq('user_id', userId),
    ])

    const pageViews = pageViewsRes.data || []
    const links = linksRes.data || []

    const totalClicks = links.reduce((sum, l) => sum + (l.click_count || 0), 0)

    // Build 30-day labels
    const labels: string[] = []
    const pvByDay: Record<string, number> = {}

    for (let i = 29; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const key = d.toISOString().slice(0, 10)
      labels.push(key)
      pvByDay[key] = 0
    }

    for (const pv of pageViews) {
      const key = pv.viewed_at.slice(0, 10)
      if (pvByDay[key] !== undefined) pvByDay[key]++
    }

    stats.value = {
      totalPageViews: pageViews.length,
      totalClicks,
      totalLinks: links.length,
      chartData: {
        labels: labels.map(l => l.slice(5)), // MM-DD
        pageViews: labels.map(l => pvByDay[l]),
        clicks: labels.map(() => 0), // per-day clicks requires separate tracking; placeholder
      },
    }

    loading.value = false
  }

  return { stats, loading, fetchStats }
})
