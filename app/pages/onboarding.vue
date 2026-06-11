<template>
  <div class="min-h-screen bg-background flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <span class="text-3xl font-bold text-gold">Besta</span><span class="text-3xl font-bold text-white">link</span>
      </div>

      <div class="card">
        <OnboardingWizardProgress :steps="stepLabels" :current="step" />

        <!-- Step 0: Welcome -->
        <OnboardingWizardStep
          v-if="step === 0"
          title="Welcome aboard!"
          description="Let's set up your personal link page in just a few steps."
        >
          <div class="flex justify-center py-6">
            <img
              v-if="session?.user?.user_metadata?.avatar_url"
              :src="session?.user?.user_metadata?.avatar_url"
              class="w-20 h-20 rounded-full ring-4 ring-gold/30"
            />
            <div v-else class="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center text-gold text-3xl font-bold ring-4 ring-gold/30">
              {{ initials }}
            </div>
          </div>
          <p class="text-center text-gray-300 mb-6">
            Hi <strong>{{ session?.user?.user_metadata?.full_name?.split(' ')[0] || 'there' }}</strong>! Your link page will be live at:
          </p>
          <div class="text-center text-sm text-gray-500 mb-6 font-mono bg-surface-raised border border-surface-border rounded-lg py-2 px-4">
            bestalink.com/<span class="text-gold">yourname</span>
          </div>
          <button class="btn-primary w-full" @click="next">Let's go →</button>
        </OnboardingWizardStep>

        <!-- Step 1: Username -->
        <OnboardingWizardStep
          v-else-if="step === 1"
          title="Choose your username"
          description="This becomes your unique link page URL."
        >
          <div class="mb-4">
            <label class="label">Username</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-3 flex items-center text-gray-500 text-sm">bestalink.com/</span>
              <input
                v-model="username"
                class="input pl-32"
                placeholder="bestbodyspray"
                @input="checkUsername"
                maxlength="30"
              />
            </div>
            <div class="mt-2 h-5 text-xs">
              <span v-if="usernameChecking" class="text-gray-500">Checking...</span>
              <span v-else-if="usernameError" class="text-red-400">{{ usernameError }}</span>
              <span v-else-if="username && !usernameError && !usernameChecking" class="text-green-400">✓ Available!</span>
            </div>
          </div>
          <div class="flex gap-2 mt-2">
            <button class="btn-ghost flex-1" @click="prev">Back</button>
            <button class="btn-primary flex-1" :disabled="!canProceedUsername" @click="next">Continue</button>
          </div>
        </OnboardingWizardStep>

        <!-- Step 2: Phone -->
        <OnboardingWizardStep
          v-else-if="step === 2"
          title="Phone number"
          description="Optional — only used for account recovery."
        >
          <div class="mb-6">
            <label class="label">Phone number <span class="text-gray-600">(optional)</span></label>
            <input v-model="phone" class="input" placeholder="+1 234 567 8900" type="tel" />
          </div>
          <div class="flex gap-2">
            <button class="btn-ghost flex-1" @click="prev">Back</button>
            <button class="btn-ghost" @click="next">Skip</button>
            <button class="btn-primary flex-1" @click="next">Continue</button>
          </div>
        </OnboardingWizardStep>

        <!-- Step 3: Brand Color -->
        <OnboardingWizardStep
          v-else-if="step === 3"
          title="Pick your brand color"
          description="This is the accent color shown on your link page."
        >
          <!-- Presets -->
          <div class="flex gap-2 flex-wrap mb-4">
            <button
              v-for="preset in colorPresets"
              :key="preset"
              class="w-9 h-9 rounded-full border-2 transition-all"
              :style="{ backgroundColor: preset, borderColor: brandColor === preset ? 'white' : 'transparent' }"
              @click="brandColor = preset"
            />
          </div>

          <!-- Custom picker -->
          <div class="flex items-center gap-3">
            <input type="color" v-model="brandColor" class="w-10 h-10 rounded cursor-pointer bg-transparent border border-surface-border" />
            <span class="text-sm text-gray-400 font-mono">{{ brandColor }}</span>
          </div>

          <!-- Live preview -->
          <div class="mt-5 p-4 rounded-xl border border-surface-border bg-surface-raised text-center">
            <p class="text-xs text-gray-500 mb-3 uppercase tracking-wider">Preview</p>
            <button class="px-5 py-2 rounded-lg font-semibold text-black text-sm" :style="{ backgroundColor: brandColor }">
              View Product →
            </button>
          </div>

          <div class="flex gap-2 mt-5">
            <button class="btn-ghost flex-1" @click="prev">Back</button>
            <button class="btn-primary flex-1" :disabled="saving" @click="finish">
              <svg v-if="saving" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Finish setup
            </button>
          </div>
        </OnboardingWizardStep>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false, middleware: ['auth'], ssr: false })

const supabase = useSupabaseClient()
const session = useSupabaseSession()
const router = useRouter()

const step = ref(0)
const stepLabels = ['Welcome', 'Username', 'Phone', 'Brand']

const username = ref('')
const phone = ref('')
const brandColor = ref('#C9A84C')
const usernameError = ref('')
const usernameChecking = ref(false)
const saving = ref(false)

const colorPresets = ['#C9A84C', '#E85D75', '#4CAAFF', '#6EE7B7', '#A78BFA', '#FB923C']

const initials = computed(() => {
  const name = (session.value?.user?.user_metadata?.full_name as string) || ''
  return name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() || 'U'
})

const canProceedUsername = computed(() =>
  username.value.length >= 3 && !usernameError.value && !usernameChecking.value
)

let debounceTimer: ReturnType<typeof setTimeout>

function checkUsername() {
  usernameError.value = ''
  clearTimeout(debounceTimer)

  const val = username.value.trim().toLowerCase()
  username.value = val

  if (!val) return

  if (!/^[a-z0-9-]{3,30}$/.test(val)) {
    usernameError.value = 'Only lowercase letters, numbers, and hyphens (3–30 chars)'
    return
  }

  usernameChecking.value = true
  debounceTimer = setTimeout(async () => {
    const { data } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', val)
      .single()

    usernameChecking.value = false
    if (data) {
      usernameError.value = 'That username is already taken'
    }
  }, 500)
}

function next() { step.value++ }
function prev() { step.value-- }

async function finish() {
  if (!session.value) return
  saving.value = true

  const { error } = await supabase.from('profiles').insert({
    user_id: session.value?.user?.id,
    username: username.value.trim(),
    phone: phone.value.trim() || null,
    brand_color: brandColor.value,
    bg_color: '#0A0A0A',
  })

  saving.value = false

  if (error) {
    console.error(error)
    return
  }

  router.push('/dashboard')
}
</script>
