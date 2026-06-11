<template>
  <div class="min-h-screen" :style="bgStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const bgColor = useState<string>('publicBgColor', () => '#0A0A0A')

const bgStyle = computed(() => ({
  backgroundColor: bgColor.value,
}))
</script>
