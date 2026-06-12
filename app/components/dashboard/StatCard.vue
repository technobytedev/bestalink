<template>
  <div class="card flex items-start gap-4">
    <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" :class="iconBg">
      <slot name="icon" />
    </div>
    <div>
      <p class="text-sm text-gray-500 mb-0.5">{{ label }}</p>
      <p v-if="loading" class="h-7 w-16 bg-surface-raised rounded animate-pulse" />
      <p v-else class="text-2xl font-bold text-white">{{ value.toLocaleString() }}{{ suffix ?? '' }}</p>
      <p v-if="trend && !loading" class="text-xs text-green-400 mt-0.5 flex items-center gap-0.5">
        <svg class="w-3 h-3 shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
        </svg>
        {{ trend }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: number
  iconBg: string
  loading?: boolean
  suffix?: string
  trend?: string | null
}>()
</script>
