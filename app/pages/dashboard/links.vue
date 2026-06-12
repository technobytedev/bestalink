<template>
  <div class="p-4 sm:p-6 max-w-2xl mx-auto">
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
    <div class="py-1">
      <!-- Header -->
      <div class="text-center mb-5">
        <div class="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
          <svg class="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <p class="text-gray-300 text-sm">You've reached your free link limit. Upgrade to add more links.</p>
      </div>

      <!-- Billing toggle -->
      <div class="flex items-center justify-center gap-3 mb-4">
        <span :class="pricingBilling === 'monthly' ? 'text-white' : 'text-gray-500'" class="text-sm font-medium">Monthly</span>
        <button
          class="relative w-11 h-6 rounded-full transition-colors"
          :class="pricingBilling === 'yearly' ? 'bg-gold' : 'bg-surface-border'"
          @click="pricingBilling = pricingBilling === 'monthly' ? 'yearly' : 'monthly'"
        >
          <span
            class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform"
            :class="pricingBilling === 'yearly' ? 'translate-x-5' : 'translate-x-0'"
          />
        </button>
        <span :class="pricingBilling === 'yearly' ? 'text-white' : 'text-gray-500'" class="text-sm font-medium">
          Yearly
          <span class="ml-1 text-xs font-semibold text-emerald-400">Save 24%</span>
        </span>
      </div>

      <!-- Plans -->
      <div class="grid grid-cols-2 gap-3 mb-5">
        <!-- Starter plan -->
        <div class="relative rounded-xl border border-surface-border bg-surface p-4 flex flex-col gap-3">
          <div>
            <p class="text-xs text-gray-500 font-medium uppercase tracking-wide mb-0.5">Starter</p>
            <div class="flex items-end gap-1">
              <span class="text-2xl font-bold text-white">{{ pricingBilling === 'monthly' ? '₱99' : '₱899' }}</span>
              <span class="text-xs text-gray-500 mb-0.5">/ {{ pricingBilling === 'monthly' ? 'mo' : 'yr' }}</span>
            </div>
            <p v-if="pricingBilling === 'yearly'" class="text-xs text-gray-500 mt-0.5">≈ ₱75 / mo</p>
          </div>
          <ul class="space-y-1.5 flex-1">
            <li class="flex items-center gap-1.5 text-xs text-gray-300">
              <svg class="w-3.5 h-3.5 text-gold shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" /></svg>
              Up to 100 links
            </li>
            <li class="flex items-center gap-1.5 text-xs text-gray-300">
              <svg class="w-3.5 h-3.5 text-gold shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" /></svg>
              Analytics
            </li>
            <li class="flex items-center gap-1.5 text-xs text-gray-300">
              <svg class="w-3.5 h-3.5 text-gold shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" /></svg>
              Custom theme
            </li>
          </ul>
          <a href="mailto:isuboldev@gmail.com" class="btn-secondary text-xs text-center py-2 block">Get Starter</a>
        </div>

        <!-- Pro plan -->
        <div class="relative rounded-xl border border-gold/50 bg-gold/5 p-4 flex flex-col gap-3">
          <div class="absolute -top-2.5 left-1/2 -translate-x-1/2">
            <span class="bg-gold text-black text-xs font-bold px-2.5 py-0.5 rounded-full">Popular</span>
          </div>
          <div>
            <p class="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">Pro</p>
            <div class="flex items-end gap-1">
              <span class="text-2xl font-bold text-white">{{ pricingBilling === 'monthly' ? '₱199' : '₱1,799' }}</span>
              <span class="text-xs text-gray-500 mb-0.5">/ {{ pricingBilling === 'monthly' ? 'mo' : 'yr' }}</span>
            </div>
            <p v-if="pricingBilling === 'yearly'" class="text-xs text-gray-500 mt-0.5">≈ ₱150 / mo</p>
          </div>
          <ul class="space-y-1.5 flex-1">
            <li class="flex items-center gap-1.5 text-xs text-gray-300">
              <svg class="w-3.5 h-3.5 text-gold shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" /></svg>
              Unlimited links
            </li>
            <li class="flex items-center gap-1.5 text-xs text-gray-300">
              <svg class="w-3.5 h-3.5 text-gold shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" /></svg>
              Advanced analytics
            </li>
            <li class="flex items-center gap-1.5 text-xs text-gray-300">
              <svg class="w-3.5 h-3.5 text-gold shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" /></svg>
              Priority support
            </li>
          </ul>
          <a href="mailto:isuboldev@gmail.com" class="btn-primary text-xs text-center py-2 block">Get Pro</a>
        </div>
      </div>

      <p class="text-center text-xs text-gray-600">Contact us at <a href="mailto:isuboldev@gmail.com" class="text-gold hover:underline">isuboldev@gmail.com</a></p>
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
const pricingBilling = ref<'monthly' | 'yearly'>('monthly')
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
