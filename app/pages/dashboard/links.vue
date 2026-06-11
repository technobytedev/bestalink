<template>
  <div class="p-6 max-w-2xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-white">My Links</h1>
        <p class="text-sm text-gray-500 mt-0.5">{{ linksStore.links.length }} / 50 links</p>
      </div>
      <button class="btn-primary" @click="handleAddClick">
        <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
        Add link
      </button>
    </div>

    <!-- Loading -->
    <div v-if="linksStore.loading" class="space-y-3">
      <div v-for="i in 4" :key="i" class="h-16 bg-surface border border-surface-border rounded-xl animate-pulse" />
    </div>

    <!-- Empty state -->
    <div v-else-if="linksStore.links.length === 0" class="text-center py-16">
      <div class="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
        <svg class="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
        </svg>
      </div>
      <h3 class="text-base font-semibold text-gray-200 mb-1">No links yet</h3>
      <p class="text-sm text-gray-500 mb-4">Add your first affiliate link to get started.</p>
      <button class="btn-primary" @click="showForm = true">Add your first link</button>
    </div>

    <!-- Link list -->
    <div v-else class="space-y-2">
      <LinksLinkCard
        v-for="link in linksStore.links"
        :key="link.id"
        :link="link"
        @edit="openEdit"
        @delete="confirmDelete"
        @toggle="toggleActive"
      />
    </div>

    <!-- Preview link -->
    <div v-if="profile" class="mt-6 p-4 bg-surface rounded-xl border border-surface-border flex items-center gap-3">
      <div class="flex-1 min-w-0">
        <p class="text-xs text-gray-500 mb-0.5">Your public page</p>
        <p class="text-sm text-gold font-medium truncate">bestalink.com/{{ profile.username }}</p>
      </div>
      <NuxtLink :to="`/${profile.username}`" target="_blank" class="btn-secondary text-xs px-3 py-1.5">Preview</NuxtLink>
    </div>
  </div>

  <!-- Add/Edit Modal -->
  <LinksLinkFormModal
    v-model="showForm"
    :link="editingLink"
    @saved="editingLink = null"
  />

  <!-- Limit reached modal -->
  <UiAppModal v-model="showLimitModal" title="Link limit reached">
    <div class="text-center py-2">
      <div class="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
        <svg class="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      </div>
      <p class="text-gray-300 mb-1">You've reached the <strong class="text-white">50 link limit</strong>.</p>
      <p class="text-sm text-gray-500 mb-5">Want to add more? Contact our support team.</p>
      <a href="mailto:support@bestalink.com" class="btn-primary w-full block text-center">Contact support</a>
    </div>
  </UiAppModal>

  <!-- Delete confirm modal -->
  <UiAppModal v-model="showDeleteModal" title="Delete link">
    <p class="text-gray-400 text-sm mb-5">Are you sure you want to delete <strong class="text-white">{{ deletingLink?.title }}</strong>? This can't be undone.</p>
    <div class="flex gap-2">
      <button class="btn-ghost flex-1" @click="showDeleteModal = false">Cancel</button>
      <button class="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-colors" @click="doDelete">Delete</button>
    </div>
  </UiAppModal>
</template>

<script setup lang="ts">
import type { Link } from '~/stores/useLinksStore'

definePageMeta({ middleware: ['auth', 'onboarding'], ssr: false })

const linksStore = useLinksStore()
const profileStore = useProfileStore()
const { profile } = storeToRefs(profileStore)

const showForm = ref(false)
const showLimitModal = ref(false)
const showDeleteModal = ref(false)
const editingLink = ref<Link | null>(null)
const deletingLink = ref<Link | null>(null)

onMounted(async () => {
  await Promise.all([linksStore.fetchLinks(), profileStore.fetchProfile()])
})

function handleAddClick() {
  if (linksStore.isAtLimit) {
    showLimitModal.value = true
  } else {
    editingLink.value = null
    showForm.value = true
  }
}

function openEdit(link: Link) {
  editingLink.value = link
  showForm.value = true
}

function confirmDelete(link: Link) {
  deletingLink.value = link
  showDeleteModal.value = true
}

async function doDelete() {
  if (!deletingLink.value) return
  await linksStore.deleteLink(deletingLink.value.id)
  showDeleteModal.value = false
  deletingLink.value = null
}

async function toggleActive(link: Link) {
  await linksStore.updateLink(link.id, { is_active: !link.is_active })
}
</script>
