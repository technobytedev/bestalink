export default defineEventHandler(async (event) => {
  const { url } = getQuery(event)

  if (!url || typeof url !== 'string') {
    throw createError({ statusCode: 400, message: 'Missing url param' })
  }

  // Basic URL validation
  let parsedUrl: URL
  try {
    parsedUrl = new URL(url)
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      throw new Error('Invalid protocol')
    }
  } catch {
    throw createError({ statusCode: 400, message: 'Invalid URL' })
  }

  try {
    const response = await $fetch.raw(url, {
      method: 'GET',
      headers: {
        // Pretend to be a browser so sites don't block us
        'User-Agent': 'Mozilla/5.0 (compatible; BestaBot/1.0; +https://bestalink.com)',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      redirect: 'follow',
      timeout: 6000,
      responseType: 'text',
    })

    const html = response._data as string

    const og = extractOgTags(html, parsedUrl.origin)

    return {
      image: og.image || null,
      title: og.title || null,
      description: og.description || null,
    }
  } catch {
    // Don't fail the request — caller handles null gracefully
    return { image: null, title: null, description: null }
  }
})

function extractOgTags(html: string, origin: string) {
  const get = (property: string): string | null => {
    // Match <meta property="og:X" content="Y"> or content before property
    const re = new RegExp(
      `<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']+)["']`,
      'i'
    )
    const re2 = new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${property}["']`,
      'i'
    )
    return (re.exec(html)?.[1] ?? re2.exec(html)?.[1] ?? null)
  }

  let image = get('og:image') ?? get('twitter:image') ?? get('twitter:image:src')

  // Resolve relative image URLs
  if (image && !image.startsWith('http')) {
    image = image.startsWith('//') ? 'https:' + image : origin + (image.startsWith('/') ? '' : '/') + image
  }

  return {
    image,
    title: get('og:title') ?? get('twitter:title'),
    description: get('og:description') ?? get('twitter:description'),
  }
}
