import { defineStore } from 'pinia'

export interface Link {
  id: string
  user_id: string
  title: string
  url: string
  thumbnail_url: string | null
  is_active: boolean
  sort_order: number
  click_count: number
  created_at: string
}

const MAX_LINKS = 50

export const useLinksStore = defineStore('links', () => {
  const supabase = useSupabaseClient()
  const session = useSupabaseSession()

  const links = ref<Link[]>([])
  const loading = ref(false)

  const activeLinks = computed(() => links.value.filter(l => l.is_active))
  const isAtLimit = computed(() => links.value.length >= MAX_LINKS)

  async function fetchLinks() {
    const uid = session.value?.user?.id
    if (!uid) return
    loading.value = true

    const { data } = await supabase
      .from('links')
      .select('*')
      .eq('user_id', uid)
      .order('sort_order', { ascending: true })

    links.value = data || []
    loading.value = false
  }

  async function addLink(payload: Pick<Link, 'title' | 'url' | 'thumbnail_url'>) {
    const uid = session.value?.user?.id
    if (!uid || isAtLimit.value) return { error: 'limit_reached' }

    const maxOrder = links.value.reduce((m, l) => Math.max(m, l.sort_order), 0)

    const { data, error } = await supabase
      .from('links')
      .insert({ ...payload, user_id: uid, sort_order: maxOrder + 1 })
      .select()
      .single()

    if (!error && data) links.value.push(data)
    return { error }
  }

  async function updateLink(id: string, updates: Partial<Pick<Link, 'title' | 'url' | 'is_active' | 'thumbnail_url'>>) {
    const { data, error } = await supabase
      .from('links')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (!error && data) {
      const idx = links.value.findIndex(l => l.id === id)
      if (idx !== -1) links.value[idx] = data
    }
    return { error }
  }

  async function deleteLink(id: string) {
    const { error } = await supabase.from('links').delete().eq('id', id)
    if (!error) links.value = links.value.filter(l => l.id !== id)
    return { error }
  }

  async function reorderLinks(reordered: Link[]) {
    links.value = reordered
    const updates = reordered.map((l, i) => ({ id: l.id, sort_order: i }))
    await Promise.all(
      updates.map(u => supabase.from('links').update({ sort_order: u.sort_order }).eq('id', u.id))
    )
  }

  return { links, activeLinks, loading, isAtLimit, fetchLinks, addLink, updateLink, deleteLink, reorderLinks }
})
