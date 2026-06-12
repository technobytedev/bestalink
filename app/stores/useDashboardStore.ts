import { defineStore } from 'pinia'
import type { Link } from './useLinksStore'

export interface DashboardStats {
  totalPageViews: number
  totalClicks: number
  totalLinks: number
  ctr: number
  trends: {
    pageViews: string | null
    clicks: string | null
    products: string | null
    ctr: string | null
  }
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

  async function fetchStats(username: string, links: Link[]) {
    loading.value = true

    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const since = thirtyDaysAgo.toISOString()

    const [pageViewsRes, clicksRes] = await Promise.all([
      supabase
        .from('page_views')
        .select('viewed_at')
        .eq('username', username)
        .gte('viewed_at', since),
      supabase
        .from('link_clicks')
        .select('clicked_at, link_id')
        .in('link_id', links.map(l => l.id))
        .gte('clicked_at', since),
    ])

    const pageViews = pageViewsRes.data || []
    const clickEvents = clicksRes.data || []

    const totalClicks = links.reduce((sum, l) => sum + (l.click_count || 0), 0)
    const totalLinks = links.length

    // Weekly split for trends
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const sevenDaysAgoStr = sevenDaysAgo.toISOString()

    const fourteenDaysAgo = new Date()
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14)
    const fourteenDaysAgoStr = fourteenDaysAgo.toISOString()

    const thisWeekViews = pageViews.filter(pv => pv.viewed_at >= sevenDaysAgoStr)
    const lastWeekViews = pageViews.filter(pv => pv.viewed_at >= fourteenDaysAgoStr && pv.viewed_at < sevenDaysAgoStr)

    let pageViewTrend: string | null = null
    if (lastWeekViews.length > 0) {
      const pct = Math.round(((thisWeekViews.length - lastWeekViews.length) / lastWeekViews.length) * 100)
      pageViewTrend = pct >= 0 ? `+${pct}% this week` : `${pct}% this week`
    } else if (thisWeekViews.length > 0) {
      pageViewTrend = `+${thisWeekViews.length} this week`
    }

    const newLinksThisMonth = links.filter(l => l.created_at >= since).length
    const productsTrend = newLinksThisMonth > 0 ? `+${newLinksThisMonth} this month` : null

    const ctr = pageViews.length > 0
      ? Math.round((totalClicks / pageViews.length) * 1000) / 10
      : 0

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const labels: string[] = []
    const dayKeys: string[] = []
    const pvByDay: Record<string, number> = {}
    const clicksByDay: Record<string, number> = {}

    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const key = d.toISOString().slice(0, 10)
      labels.push(dayNames[d.getDay()])
      dayKeys.push(key)
      pvByDay[key] = 0
      clicksByDay[key] = 0
    }

    for (const pv of thisWeekViews) {
      const key = pv.viewed_at.slice(0, 10)
      if (pvByDay[key] !== undefined) pvByDay[key]++
    }

    for (const click of clickEvents) {
      const key = click.clicked_at.slice(0, 10)
      if (clicksByDay[key] !== undefined) clicksByDay[key]++
    }

    stats.value = {
      totalPageViews: pageViews.length,
      totalClicks,
      totalLinks,
      ctr,
      trends: {
        pageViews: pageViewTrend,
        clicks: null,
        products: productsTrend,
        ctr: null,
      },
      chartData: {
        labels,
        pageViews: dayKeys.map(k => pvByDay[k]),
        clicks: dayKeys.map(k => clicksByDay[k]),
      },
    }

    loading.value = false
  }

  return { stats, loading, fetchStats }
})
