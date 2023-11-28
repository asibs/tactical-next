import "./globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import StoryblokBridgeLoader from "@storyblok/react/bridge-loader";
import StoryblokProvider from "@/storyblok/components/StoryblokProvider";
import StoryblokWrapper from "@/storyblok/components/StoryblokWrapper";
import { ComponentsMap } from "@/storyblok/components/ComponentsMap";

// Force next.js not to cache API calls by default. This means caching is OPT-IN rather than OPT-OUT.
// This avoids issues with the Storyblok js client, which has it's own built-in caching, and Next.js caching interferes with this...
export const revalidate = 0;

const inter = Inter({ subsets: ["latin"] });

storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  apiOptions: { region: "eu" },
  components: ComponentsMap,
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.ENABLE_STORYBLOK_LIVE_EDITING === "true") {
    console.debug("layout.tsx: Enabling live-editing");
    return (
      <StoryblokProvider>
        <html lang="en">
          <body className={inter.className}>
            <StoryblokWrapper slug="navigation" />
            {children}
            <StoryblokWrapper slug="footer" />
          </body>
        </html>
      </StoryblokProvider>
    );
  } else {
    console.debug("layout.tsx: Disabling live-editing");
    return (
      <html lang="en">
        <body className={inter.className}>
          <StoryblokWrapper slug="navigation" />
          {children}
          <StoryblokWrapper slug="footer" />
        </body>
        <StoryblokBridgeLoader options={{}} />
      </html>
    );
  }
}
