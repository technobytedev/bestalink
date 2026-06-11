import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const username = body?.username as string | undefined

  if (!username) return { ok: false }

  const config = useRuntimeConfig()
  const supabase = createClient(
    config.public.supabaseUrl as string,
    config.supabaseServiceKey as string,
  )

  await supabase.from('page_views').insert({ username })

  return { ok: true }
})
