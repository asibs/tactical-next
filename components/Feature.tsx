import { storyblokEditable } from "@storyblok/react/rsc";
import { FeatureStoryblok } from "@/storyblok/types/storyblok-types";

const Feature = ({ blok }: { blok: FeatureStoryblok }) => (
  <div {...storyblokEditable(blok)}>{blok.name}</div>
);

export default Feature;
