import { RichTextStoryblok } from "@/storyblok/types/storyblok-types";
import { storyblokEditable } from "@storyblok/react/rsc";
import { render } from "storyblok-rich-text-react-renderer";

const RichText = ({ blok }: { blok: RichTextStoryblok }) => {
  return (
    <div {...storyblokEditable(blok)} className="text-start">
      {render(blok.text)}
    </div>
  );
};

export default RichText;
