import { ISbStoriesParams, StoryblokComponent, StoryblokStory, getStoryblokApi } from '@storyblok/react/rsc'
import { promises as fs } from 'fs'

type params = {
  slug: string
}

export default async function StoryblokWrapper({slug}: params) {
  if (process.env.ENABLE_STORYBLOK_LIVE_EDITING === 'true') {
    console.debug('StoryblokWrapper.tsx: Enabling live-editing!')

    // We want draft versions of data from Storyblok, as we're live-editing
    let sbParams: ISbStoriesParams = {
      version: 'draft'
    }
  
    const storyblokApi = getStoryblokApi()
    const storyblokResponse = await storyblokApi.get(`cdn/stories/${slug}`, sbParams)

    return (
      <StoryblokStory story={storyblokResponse.data.story} />
    )
  } else {
    console.debug('StoryblokWrapper.tsx: Disabling live-editing!')

    const file = await fs.readFile(process.cwd() + `/storyblok_data/${slug}.json`, 'utf8')
    const data = JSON.parse(file)

    return (
      <StoryblokComponent blok={data.story.content} />
    )
  }
}
