import { defineStore } from 'pinia'

export interface Profile {
  id: string
  user_id: string
  username: string
  phone: string | null
  bg_color: string
  brand_color: string
  role: 'user' | 'admin'
  is_active: boolean
  created_at: string
}

export const useProfileStore = defineStore('profile', () => {
  const supabase = useSupabaseClient()
  const session = useSupabaseSession()

  const profile = ref<Profile | null>(null)
  const loading = ref(false)

  async function fetchProfile() {
    const uid = session.value?.user?.id
    if (!uid) return
    loading.value = true

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', uid)
      .single()

    profile.value = data
    loading.value = false
  }

  async function updateProfile(updates: Partial<Pick<Profile, 'bg_color' | 'brand_color' | 'phone' | 'username'>>) {
    const uid = session.value?.user?.id
    if (!uid) return
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', uid)
      .select()
      .single()

    if (!error && data) {
      profile.value = data
    }
    return { error }
  }

  return { profile, loading, fetchProfile, updateProfile }
})
