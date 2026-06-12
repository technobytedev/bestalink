import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const linkId = body?.linkId as string | undefined

  if (!linkId) return { ok: false }

  const config = useRuntimeConfig()
  const supabase = createClient(
    config.public.supabaseUrl as string,
    config.supabaseServiceKey as string,
  )

  const { data: link } = await supabase
    .from('links')
    .select('click_count')
    .eq('id', linkId)
    .single()

  await Promise.all([
    supabase.from('link_clicks').insert({ link_id: linkId }),
    supabase.from('links').update({ click_count: (link?.click_count || 0) + 1 }).eq('id', linkId),
  ])

  return { ok: true }
})
