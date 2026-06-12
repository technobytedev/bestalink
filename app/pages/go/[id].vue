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
    .select('url, click_count')
    .eq('id', id)
    .single()

  if (!data?.url) return

  await (supabase as any)
    .from('links')
    .update({ click_count: (data.click_count || 0) + 1 })
    .eq('id', id)

  window.location.href = data.url
})
</script>
