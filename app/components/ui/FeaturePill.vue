<template>
  <div class="flex items-center gap-1.5 px-4 py-2 rounded-full border border-surface-border bg-surface text-sm text-gray-400">
    <svg class="w-3.5 h-3.5 text-gold" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
    </svg>
    {{ label }}
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string }>()
</script>
