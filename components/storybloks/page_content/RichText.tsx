import { RichTextStoryblok } from "@/storyblok/types/storyblok-types";
import { storyblokEditable } from "@storyblok/react/rsc";
import Link from "next/link";
import { render, MARK_LINK } from "storyblok-rich-text-react-renderer";

/* See https://github.com/claus/storyblok-rich-text-react-renderer#readme
 * for more information on customising the rich text with React/Next.js elements
 */
const RichText = ({ blok }: { blok: RichTextStoryblok }) => {
  return (
    <div {...storyblokEditable(blok)} className="text-start">
      {render(blok.text, {
        markResolvers: {
          [MARK_LINK]: (children, props) => {
            const { linktype, href, target } = props;
            if (linktype === "email") {
              // Email links: add `mailto:` scheme and map to <a>
              return <a href={`mailto:${href}`}>{children}</a>;
            }
            if (!href || href.match(/^(https?:)?\/\//)) {
              // External links: map to <a>
              return (
                <a href={href} target={target}>
                  {children}
                </a>
              );
            }
            // Internal links: map to Next.js <Link>
            return <Link href={href}>{children}</Link>;
          },
        },
      })}
    </div>
  );
};

export default RichText;
