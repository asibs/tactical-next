import { StoryblokComponent, StoryblokStory } from '@storyblok/react/rsc'

type params = {
  slug: string
}

export default async function StoryblokWrapper({slug}: params) {
  // Fetch storyblok page data from our internal API. If live-editing is enabled, don't cache,
  // call the API on every page load. If live-editing is off, permanently cache the result (ie.
  // the page will be statically rendered at build time)
  const revalidateTime = (process.env.ENABLE_STORYBLOK_LIVE_EDITING === 'true' ? 0 : false)
  const res = await fetch(`https://localhost:3000/page_data/${slug}`, { next: { revalidate: revalidateTime } })
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  const data = await res.json()
  console.debug(`Got data for slug ${slug}: ${JSON.stringify(data)}`)

  if (process.env.ENABLE_STORYBLOK_LIVE_EDITING === 'true') {
    console.debug('StoryblokWrapper.tsx: Enabling live-editing!')
    return (
      <StoryblokStory story={data.story} />
    )
  } else {
    console.debug('StoryblokWrapper.tsx: Disabling live-editing!')
    return (
      <StoryblokComponent blok={data.story.content} />
    )
  }
}
