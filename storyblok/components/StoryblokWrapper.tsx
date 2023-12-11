import path from "path";
import { readFileSync } from "fs";
import { unstable_cache } from "next/cache";
import getConfig from "next/config";
import {
  ISbStoriesParams,
  StoryblokComponent,
  StoryblokStory,
  getStoryblokApi,
} from "@storyblok/react/rsc";

const { serverRuntimeConfig } = getConfig() || {};

type params = {
  slug: string;
};

export default async function StoryblokWrapper({ slug }: params) {
  if (process.env.ENABLE_STORYBLOK_LIVE_EDITING === "true") {
    console.debug("StoryblokWrapper.tsx: Enabling live-editing");
    // When live-editing is enabled, we get data from the Storyblok API

    let sbParams: ISbStoriesParams = {
      version: "draft", // Want draft versions, as we're live-editing
    };

    const storyblokApi = getStoryblokApi();
    try {
      const storyblokResponse = await storyblokApi.get(
        `cdn/stories/${slug}`,
        sbParams,
      );
      return <StoryblokStory story={storyblokResponse.data.story} />;
    } catch {
      return <h1>Error: Content for [{slug}] not found</h1>;
    }
  } else {
    console.debug("StoryblokWrapper.tsx: Disabling live-editing");
    /* When live-editing is disabled, we use the local filesystem containing the story JSON,
     * and cache it indefinitely so pages are statically generated at build-time.
     *
     * Note that the cache persists even BETWEEN deployments, so the cache key must contain
     * something which will vary between deploys. We use the application version from the
     * package.json file, which is auto-bumped by a Github Action.
     */
    const getLocalStorybookData = unstable_cache(
      // Cache data function
      async () => {
        console.debug(
          `StoryblokWrapper.tsx: Updating static storyblok data cache for ${slug}`,
        );
        const filePath = path.join(
          process.cwd(),
          "storyblok",
          "data",
          `${slug}.json`,
        );
        const fileContent = readFileSync(filePath, "utf8");
        return JSON.parse(fileContent);
      },
      // Cache key
      [`storyblok/data/${slug}.json.${serverRuntimeConfig.appVersion}`],
      // Cache options
      { revalidate: false }, // Cache will never refresh
    );

    const data = await getLocalStorybookData();
    return <StoryblokComponent blok={data.story.content} />;
  }
}
