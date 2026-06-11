<template>
  <NuxtLink
    :to="to"
    class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
    :class="isActive
      ? 'bg-gold/15 text-gold'
      : 'text-gray-400 hover:text-gray-100 hover:bg-surface-raised'"
  >
    <component :is="iconComponent" class="w-4 h-4 shrink-0" />
    {{ label }}
  </NuxtLink>
</template>

<script setup lang="ts">
import {
  ChartBarIcon,
  LinkIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
} from '@heroicons/vue/24/outline'

const props = defineProps<{
  to: string
  icon: 'chart' | 'link' | 'settings' | 'shield'
  label: string
}>()

const route = useRoute()
const isActive = computed(() => route.path === props.to || (props.to !== '/dashboard' && route.path.startsWith(props.to)))

const iconMap = {
  chart: ChartBarIcon,
  link: LinkIcon,
  settings: Cog6ToothIcon,
  shield: ShieldCheckIcon,
}

const iconComponent = computed(() => iconMap[props.icon])
</script>
