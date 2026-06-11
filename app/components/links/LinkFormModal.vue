<template>
  <UiAppModal :model-value="modelValue" :title="link ? 'Edit Link' : 'Add Link'" @update:model-value="$emit('update:modelValue', $event)">
    <form @submit.prevent="submit" class="space-y-4">

      <!-- URL first so we can fetch preview early -->
      <div>
        <label class="label">Product URL</label>
        <input
          v-model="form.url"
          class="input"
          placeholder="https://amazon.com/dp/..."
          required
          type="url"
          @input="onUrlInput"
        />
      </div>

      <!-- OG Preview card -->
      <div v-if="previewing" class="flex items-center gap-2 text-xs text-gray-500 py-1">
        <svg class="w-3.5 h-3.5 animate-spin text-gold" viewBox="0 0 24 24" fill="none">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        Fetching link preview...
      </div>

      <div v-else-if="preview.image" class="rounded-xl border border-surface-border overflow-hidden">
        <div class="relative">
          <img
            :src="preview.image"
            class="w-full h-36 object-cover"
            @error="preview.image = null"
          />
          <!-- Remove preview button -->
          <button
            type="button"
            class="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
            @click="preview.image = null; form.thumbnail_url = null"
          >
            <svg class="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
        <div class="px-3 py-2 bg-surface-raised">
          <p class="text-xs text-gray-400 truncate">{{ preview.title || form.url }}</p>
        </div>
      </div>

      <div v-else-if="previewAttempted && !preview.image" class="flex items-center gap-2 text-xs text-gray-600 py-1">
        <svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
        </svg>
        No preview image found for this link
      </div>

      <div>
        <label class="label">Title</label>
        <input v-model="form.title" class="input" placeholder="Best Body Spray" required maxlength="80" />
      </div>

      <div class="flex gap-2 pt-1">
        <button type="button" class="btn-ghost flex-1" @click="$emit('update:modelValue', false)">Cancel</button>
        <button type="submit" class="btn-primary flex-1" :disabled="saving">
          <svg v-if="saving" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          {{ link ? 'Save changes' : 'Add link' }}
        </button>
      </div>
    </form>
  </UiAppModal>
</template>

<script setup lang="ts">
import type { Link } from '~/stores/useLinksStore'

const props = defineProps<{
  modelValue: boolean
  link?: Link | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  saved: []
}>()

const linksStore = useLinksStore()
const saving = ref(false)
const previewing = ref(false)
const previewAttempted = ref(false)

const preview = reactive<{ image: string | null; title: string | null }>({
  image: null,
  title: null,
})

const form = reactive({
  title: '',
  url: '',
  thumbnail_url: null as string | null,
})

// Populate form when editing an existing link
watch(() => props.link, (l) => {
  form.title = l?.title ?? ''
  form.url = l?.url ?? ''
  form.thumbnail_url = l?.thumbnail_url ?? null
  preview.image = l?.thumbnail_url ?? null
  preview.title = l?.title ?? null
  previewAttempted.value = !!l
}, { immediate: true })

// Reset when modal opens fresh (no link)
watch(() => props.modelValue, (open) => {
  if (open && !props.link) {
    form.title = ''
    form.url = ''
    form.thumbnail_url = null
    preview.image = null
    preview.title = null
    previewAttempted.value = false
  }
})

let debounceTimer: ReturnType<typeof setTimeout>

function onUrlInput() {
  clearTimeout(debounceTimer)
  preview.image = null
  preview.title = null
  previewAttempted.value = false

  const url = form.url.trim()
  if (!url) return

  try { new URL(url) } catch { return } // skip invalid URLs

  debounceTimer = setTimeout(fetchPreview, 700)
}

async function fetchPreview() {
  const url = form.url.trim()
  if (!url) return

  previewing.value = true
  previewAttempted.value = true

  try {
    const data = await $fetch<{ image: string | null; title: string | null }>('/api/og-preview', {
      params: { url },
    })

    preview.image = data.image
    preview.title = data.title

    // Auto-fill title if empty and we got one
    if (!form.title && data.title) {
      form.title = data.title.slice(0, 80)
    }

    form.thumbnail_url = data.image
  } catch {
    preview.image = null
  } finally {
    previewing.value = false
  }
}

async function submit() {
  saving.value = true
  if (props.link) {
    await linksStore.updateLink(props.link.id, {
      title: form.title,
      url: form.url,
      thumbnail_url: form.thumbnail_url,
    })
  } else {
    await linksStore.addLink({
      title: form.title,
      url: form.url,
      thumbnail_url: form.thumbnail_url,
    })
  }
  saving.value = false
  emit('update:modelValue', false)
  emit('saved')
}
</script>
