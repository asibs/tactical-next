import { ISbStoriesParams, StoryblokComponent, StoryblokStory, getStoryblokApi } from '@storyblok/react/rsc'

async function getStoryblokData(slug: string) { 
  // For live-editing, we want draft versions of data from Storyblok - otherwise just published data.
  let sbParams: ISbStoriesParams = {
    version: (process.env.ENABLE_STORYBLOK_LIVE_EDITING === 'true' ? 'draft' : 'published')
  };
 
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/${slug}`, sbParams);
}

type params = {
  slug: string
}

export default async function StoryblokWrapper({slug}: params) {
  const { data } = await getStoryblokData(slug);
  console.log(`Got data for slug ${slug}: ${JSON.stringify(data)}`)

  if (process.env.ENABLE_STORYBLOK_LIVE_EDITING === 'true') {
    console.log('StoryblokWrapper.tsx: Enabling live-editing!')
    return (
      <StoryblokStory story={data.story} />
    )
  } else {
    console.log('StoryblokWrapper.tsx: Disabling live-editing!')
    return (
      <StoryblokComponent blok={data.story.content} />
    )
  }
}
