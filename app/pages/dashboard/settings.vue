<template>
  <div class="p-6 max-w-xl mx-auto">
    <h1 class="text-2xl font-bold text-white mb-6">Settings</h1>

    <form @submit.prevent="save" class="space-y-6">
      <!-- Profile card -->
      <div class="card space-y-4">
        <h2 class="text-sm font-semibold text-gray-300 uppercase tracking-wider">Profile</h2>

        <div>
          <label class="label">Username</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-3 flex items-center text-gray-500 text-sm">bestalink.com/</span>
            <input v-model="form.username" class="input pl-32" @input="checkUsername" maxlength="30" />
          </div>
          <div class="mt-1.5 h-4 text-xs">
            <span v-if="usernameChecking" class="text-gray-500">Checking...</span>
            <span v-else-if="usernameError" class="text-red-400">{{ usernameError }}</span>
            <span v-else-if="usernameChanged && !usernameError && !usernameChecking" class="text-green-400">✓ Available</span>
          </div>
        </div>

        <div>
          <label class="label">Phone <span class="text-gray-600">(optional)</span></label>
          <input v-model="form.phone" class="input" type="tel" placeholder="+1 234 567 8900" />
        </div>
      </div>

      <!-- Appearance card -->
      <div class="card space-y-4">
        <h2 class="text-sm font-semibold text-gray-300 uppercase tracking-wider">Appearance</h2>

        <div>
          <label class="label">Background color</label>
          <div class="flex items-center gap-3">
            <input type="color" v-model="form.bg_color" class="w-10 h-10 rounded cursor-pointer bg-transparent border border-surface-border" />
            <span class="text-sm text-gray-400 font-mono">{{ form.bg_color }}</span>
            <button type="button" class="text-xs text-gray-500 hover:text-gray-300" @click="form.bg_color = '#0A0A0A'">Reset</button>
          </div>
        </div>

        <div>
          <label class="label">Brand / button color</label>
          <div class="flex flex-wrap gap-2 mb-3">
            <button
              v-for="c in colorPresets"
              :key="c"
              type="button"
              class="w-8 h-8 rounded-full border-2 transition-all"
              :style="{ backgroundColor: c, borderColor: form.brand_color === c ? 'white' : 'transparent' }"
              @click="form.brand_color = c"
            />
          </div>
          <div class="flex items-center gap-3">
            <input type="color" v-model="form.brand_color" class="w-10 h-10 rounded cursor-pointer bg-transparent border border-surface-border" />
            <span class="text-sm text-gray-400 font-mono">{{ form.brand_color }}</span>
          </div>
        </div>

        <!-- Preview -->
        <div class="rounded-xl border border-surface-border p-4 text-center" :style="{ backgroundColor: form.bg_color }">
          <p class="text-xs text-gray-500 mb-3 uppercase tracking-wider">Live preview</p>
          <button type="button" class="px-5 py-2 rounded-lg font-semibold text-sm" :style="{ backgroundColor: form.brand_color, color: contrastColor }">
            View Product →
          </button>
        </div>
      </div>

      <!-- Save -->
      <div class="flex items-center gap-3">
        <button type="submit" class="btn-primary" :disabled="saving || !!usernameError">
          <svg v-if="saving" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          Save changes
        </button>
        <span v-if="savedMsg" class="text-sm text-green-400 animate-fade-in">{{ savedMsg }}</span>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ['auth', 'onboarding'], ssr: false })

const profileStore = useProfileStore()
const supabase = useSupabaseClient()
const session = useSupabaseSession()

const { profile } = storeToRefs(profileStore)
const saving = ref(false)
const savedMsg = ref('')
const usernameError = ref('')
const usernameChecking = ref(false)

const colorPresets = ['#C9A84C', '#E85D75', '#4CAAFF', '#6EE7B7', '#A78BFA', '#FB923C']

const form = reactive({
  username: '',
  phone: '',
  bg_color: '#0A0A0A',
  brand_color: '#C9A84C',
})

const usernameChanged = computed(() => form.username !== profile.value?.username)

const contrastColor = computed(() => {
  const hex = form.brand_color
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5 ? '#000' : '#fff'
})

onMounted(async () => {
  await profileStore.fetchProfile()
  if (profile.value) {
    form.username = profile.value.username
    form.phone = profile.value.phone || ''
    form.bg_color = profile.value.bg_color
    form.brand_color = profile.value.brand_color
  }
})

let debounce: ReturnType<typeof setTimeout>

function checkUsername() {
  usernameError.value = ''
  clearTimeout(debounce)

  const val = form.username.trim().toLowerCase()
  form.username = val

  if (val === profile.value?.username) return
  if (!val) return

  if (!/^[a-z0-9-]{3,30}$/.test(val)) {
    usernameError.value = 'Only lowercase letters, numbers, and hyphens (3–30 chars)'
    return
  }

  usernameChecking.value = true
  debounce = setTimeout(async () => {
    const { data } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', val)
      .neq('user_id', session.value?.user?.id ?? '')
      .single()

    usernameChecking.value = false
    if (data) usernameError.value = 'That username is already taken'
  }, 500)
}

async function save() {
  if (usernameError.value) return
  saving.value = true

  const { error } = await profileStore.updateProfile({
    username: form.username.trim(),
    phone: form.phone.trim() || null as unknown as string,
    bg_color: form.bg_color,
    brand_color: form.brand_color,
  })

  saving.value = false

  if (!error) {
    savedMsg.value = 'Saved!'
    setTimeout(() => (savedMsg.value = ''), 2500)
  }
}
</script>
