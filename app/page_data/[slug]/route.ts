import { promises as fs } from 'fs'
import { ISbStoriesParams, getStoryblokApi, storyblokInit, apiPlugin } from '@storyblok/react/rsc'

// Force next.js not to cache any API calls made from this API route. This API route itself will be cached by pages if necessary.
// The only API called from this API route is Storyblok, and the Storyblok js client has it's own built-in caching.
export const revalidate = 0

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug

  if (process.env.ENABLE_STORYBLOK_LIVE_EDITING === 'true') {
    console.debug(`page_data/${slug}/routes.ts: live-editing is enabled`)
    // If live-editing is enabled, get data from the Storyblok API

    storyblokInit({
      accessToken: process.env.STORYBLOK_API_TOKEN,
      use: [apiPlugin],
      apiOptions: { region: 'eu' },
    })

    // We want draft versions of data from Storyblok, as we're live-editing
    let sbParams: ISbStoriesParams = {
      version: 'draft'
    }
  
    const storyblokApi = getStoryblokApi()
    const storyblokData = await storyblokApi.get(`cdn/stories/${slug}`, sbParams)
    return Response.json(storyblokData.data)
  } else {
    console.debug(`page_data/${slug}/routes.ts: live-editing is disabled`)
    // If live-editing is disabled, get data from local file store

    const file = await fs.readFile(process.cwd() + `/storyblok_data/${slug}.json`, 'utf8')
    const data = JSON.parse(file)
    return Response.json(data)
  }
}