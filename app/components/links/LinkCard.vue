<template>
  <div class="flex items-center gap-3 p-4 bg-surface border border-surface-border rounded-xl hover:border-gold/30 transition-colors group">
    <!-- Drag handle -->
    <div class="text-gray-600 cursor-grab active:cursor-grabbing shrink-0">
      <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
        <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"/>
      </svg>
    </div>

    <!-- Thumbnail -->
    <div class="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-surface-raised border border-surface-border">
      <img v-if="link.thumbnail_url" :src="link.thumbnail_url" class="w-full h-full object-cover" />
      <div v-else class="w-full h-full flex items-center justify-center text-gray-600">
        <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M1 5.25A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17H3.25A2.25 2.25 0 011 14.75v-9.5zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 00.75-.75v-2.69l-2.22-2.219a.75.75 0 00-1.061 0l-1.106 1.105 2.26 2.26a.75.75 0 11-1.061 1.06l-3.841-3.84a.75.75 0 00-1.06 0l-4.71 4.71zm10.25-7.06a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 min-w-0">
      <p class="text-sm font-medium text-gray-100 truncate">{{ link.title }}</p>
      <p class="text-xs text-gray-500 truncate">{{ link.url }}</p>
    </div>

    <!-- Click count -->
    <div class="text-right shrink-0">
      <p class="text-sm font-semibold text-gold">{{ link.click_count }}</p>
      <p class="text-xs text-gray-600">clicks</p>
    </div>

    <!-- Active toggle -->
    <button
      class="shrink-0 w-10 h-6 rounded-full transition-colors duration-200 relative"
      :class="link.is_active ? 'bg-gold' : 'bg-surface-raised border border-surface-border'"
      @click="$emit('toggle', link)"
    >
      <span
        class="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200"
        :class="link.is_active ? 'left-5' : 'left-1'"
      />
    </button>

    <!-- Actions -->
    <div class="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
      <button class="p-1.5 text-gray-500 hover:text-gray-100 hover:bg-surface-raised rounded-lg transition-colors" @click="$emit('edit', link)">
        <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
        </svg>
      </button>
      <button class="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" @click="$emit('delete', link)">
        <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Link } from '~/stores/useLinksStore'

defineProps<{ link: Link }>()
defineEmits<{
  edit: [link: Link]
  delete: [link: Link]
  toggle: [link: Link]
}>()
</script>
