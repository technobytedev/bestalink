<template>
  <div />
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const route = useRoute()
const id = route.params.id as string
const supabase = useSupabaseClient()

onMounted(async () => {
  const { data } = await (supabase as any)
    .from('links')
    .select('url')
    .eq('id', id)
    .single()

  if (!data?.url) return

  await $fetch('/api/track-click', { method: 'POST', body: { linkId: id } })

  window.location.href = data.url
})
</script>
