<template>
  <div class="card flex items-start gap-4">
    <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" :class="iconBg">
      <slot name="icon" />
    </div>
    <div>
      <p class="text-sm text-gray-500 mb-0.5">{{ label }}</p>
      <p v-if="loading" class="h-7 w-16 bg-surface-raised rounded animate-pulse" />
      <p v-else class="text-2xl font-bold text-white">{{ value.toLocaleString() }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: number
  iconBg: string
  loading?: boolean
}>()
</script>
