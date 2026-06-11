<template>
  <div class="animate-slide-up">
    <h2 class="text-2xl font-bold text-white mb-1">{{ title }}</h2>
    <p class="text-gray-400 text-sm mb-6">{{ description }}</p>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>
