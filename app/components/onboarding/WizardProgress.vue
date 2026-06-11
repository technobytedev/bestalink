<template>
  <div class="flex items-center gap-2 mb-8">
    <template v-for="(step, i) in steps" :key="i">
      <div class="flex items-center gap-1.5">
        <div
          class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
          :class="i < current
            ? 'bg-gold text-black'
            : i === current
              ? 'bg-gold/20 border-2 border-gold text-gold'
              : 'bg-surface border border-surface-border text-gray-500'"
        >
          <svg v-if="i < current" class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
          </svg>
          <span v-else>{{ i + 1 }}</span>
        </div>
        <span class="text-xs hidden sm:block" :class="i === current ? 'text-gray-200' : 'text-gray-600'">{{ step }}</span>
      </div>
      <div v-if="i < steps.length - 1" class="flex-1 h-px" :class="i < current ? 'bg-gold/40' : 'bg-surface-border'" />
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  steps: string[]
  current: number
}>()
</script>
