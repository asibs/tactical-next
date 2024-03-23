"use client";
// ToggleText needs to be a client component - it's interactive

import { ToggleTextStoryblok } from "@/storyblok/types/storyblok-types";
import { storyblokEditable } from "@storyblok/react/rsc";
import { render } from "storyblok-rich-text-react-renderer";
import ToggleText from "@/components/ToggleText";

const StoryblokToggleText = ({ blok }: { blok: ToggleTextStoryblok }) => {
  return (
    <div {...storyblokEditable(blok)} className="my-4">
      <ToggleText
        id={blok._uid}
        title={<h2>{blok.title}</h2>}
        content={render(blok.text)}
        textShownInitially={blok.text_shown_initially}
        chevronSize="fs-2"
      />
    </div>
  );
};

export default StoryblokToggleText;
