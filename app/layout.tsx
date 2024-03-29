import { rubik } from "@/utils/Fonts";
import "./globals.scss";
import type { Metadata } from "next";
import Navigation from "@/components/navigation/Navigation";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import StoryblokBridgeLoader from "@storyblok/react/bridge-loader";
import StoryblokProvider from "@/storyblok/components/StoryblokProvider";
import StoryblokWrapper from "@/storyblok/components/StoryblokWrapper";
import { ComponentsMap } from "@/storyblok/components/ComponentsMap";

/*
 * This line prevents caching when storyblok live editing is enabled:
 * (revalidate = 0)
 * Otherwise it sets the default for indefinite caching:
 * (revalidate = false)
 */
export const revalidate =
  process.env.ENABLE_STORYBLOK_LIVE_EDITING === "true" ? 0 : false;

if (process.env.ENABLE_STORYBLOK_LIVE_EDITING === "true") {
  storyblokInit({
    accessToken: process.env.STORYBLOK_API_TOKEN,
    use: [apiPlugin],
    apiOptions: { region: "eu" },
    components: ComponentsMap,
  });
} else {
  storyblokInit({
    components: ComponentsMap,
  });
}

export const metadata: Metadata = {
  title: {
    default: "Stop The Tories .Vote",
    template: "%s | Stop The Tories .Vote",
  },
  description:
    "Your vote is your power. Use it tactically to get the Tories out, then influence your new MP and the next government.",
  openGraph: {
    title: "StopTheTories.Vote",
    description:
      "Your vote is your power. Find out how to use it tactically to Stop The Tories and influence the next government.",
    url: "https://stopthetories.vote",
    siteName: "StopTheTories.Vote",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stop The Tories .Vote",
    description:
      "Your vote is your power. Use it tactically to get the Tories out, then influence your new MP and the next government.",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.ENABLE_STORYBLOK_LIVE_EDITING === "true") {
    console.debug(
      "layout.tsx: Enabling live-editing (should be disabled in Prod!)",
    );
    return (
      <StoryblokProvider>
        {/*
        Adding rubik.variable here makes the --font-rubik CSS var available
        (used in globals.scss to style headers, etc)
        */}
        <html lang="en" className={rubik.variable}>
          <body>
            {/* Only use Storyblok if we want to render the nav with hamburger */}
            {/* <StoryblokWrapper slug="layout/navigation" /> */}
            <Navigation />
            {children}
            <StoryblokWrapper slug="layout/footer" />
          </body>
        </html>
      </StoryblokProvider>
    );
  } else {
    return (
      <html lang="en" className={rubik.variable}>
        <body>
          {/* Only use Storyblok if we want to render the nav with hamburger */}
          {/* <StoryblokWrapper slug="layout/navigation" /> */}
          <Navigation />
          {children}
          <StoryblokWrapper slug="layout/footer" />
        </body>
      </html>
    );
  }
}
