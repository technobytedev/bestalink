import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const linkId = getRouterParam(event, 'linkId')
  if (!linkId) {
    throw createError({ statusCode: 400, message: 'Missing link ID' })
  }

  const config = useRuntimeConfig()
  const supabase = createClient(
    config.public.supabaseUrl as string,
    config.supabaseServiceKey as string,
  )

  const { data: link } = await supabase
    .from('links')
    .select('url, is_active')
    .eq('id', linkId)
    .single()

  if (!link || !link.is_active) {
    throw createError({ statusCode: 404, message: 'Link not found' })
  }

  await supabase.rpc('increment_link_click', { link_id: linkId })

  return sendRedirect(event, link.url, 302)
})
