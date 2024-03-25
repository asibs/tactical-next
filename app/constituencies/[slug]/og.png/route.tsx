import {
  getConstituencyData,
  getConstituencySlugs,
} from "@/utils/constituencyData";
import { ImageResponse, NextRequest } from "next/server";
import { promises as fs } from "fs";

import path from "path";

// Route segment config
export const dynamic = "error"; // Error unless rendering statically
export const dynamicParams = false; // Don't allow params not in generateStaticParams
export const revalidate = false; // Never revalidate, always use cached version
export const runtime = "nodejs";

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const constituencySlugs = await getConstituencySlugs();
  return constituencySlugs.map((slug) => ({ slug: slug }));
}

// Disable some linting rules which don't make sense in the context of generating an image
/* eslint @next/next/no-img-element: 0 */
/* eslint jsx-a11y/alt-text: 0 */

// Image generation
export async function GET(
  response: NextRequest,
  { params }: { params: { slug: string } },
) {
  /* Generates an opengraph image for the constituency identified by the slug.
   *
   * Uses Next.js ImageResponse:
   * https://nextjs.org/docs/app/api-reference/functions/image-response
   *
   * See examples of using this to generate OpenGraph images here:
   * https://vercel.com/docs/functions/og-image-generation/og-image-examples
   *
   * The 'standard' Next.js way of doing dynamic share images is via
   * `opengraph-image.tsx` & `twitter-image.tsx` files, but these need to run on the edge
   * which has various restrictions:
   * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image#generate-images-using-code-js-ts-tsx
   *
   * Instead, we use an API route which runs on the node runtime to statically generate
   * all the share images at build time.
   *
   * Note that while ImageResponse lets you render some HTML and output it as an image,
   * various functionality is not available - for example, you need to use inline styles
   * rather than the sitewide CSS / bootstrap, you need to load images & fonts in a
   * specific way, etc.
   */
  const constituencyData: ConstituencyData = await getConstituencyData(
    params.slug,
  );

  const constituencyName = constituencyData.constituencyIdentifiers.name;

  const rubikBoldFP = path.join(
    process.cwd(),
    "assets",
    "fonts",
    "Rubik-Bold.ttf",
  );
  const baseImgFP = path.join(
    process.cwd(),
    "assets",
    "share-base-image-ge2024.jpeg",
  );
  const rubikBoldFontData = await fs.readFile(rubikBoldFP);

  //force the type to deal with TS errors caused by ImageResponse HTML processor
  const baseImageData: string = (await fs.readFile(baseImgFP))
    .buffer as unknown as string;

  // Programatically calcuate the font size
  // Between 8 char and 19 char it's single line and font is from

  let lineLen = constituencyName.length;

  if (lineLen > 19) {
    const nameArr = constituencyName.split(/[ -]/);
    const lineOne = [];
    const lineTwo = [];
    while (nameArr.length != 0) {
      if (lineOne.join().length > lineTwo.join().length) {
        lineTwo.push(nameArr.pop());
      } else {
        lineOne.push(nameArr.shift());
      }
    }

    if (lineTwo.join().length > lineOne.join().length) {
      lineLen = lineTwo.join(" ").length;
    } else {
      lineLen = lineOne.join(" ").length;
    }
  }

  let fontSize = Math.floor(lineLen * -3 + 130);

  if (lineLen < 9) fontSize = 148;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}
      >
        <img
          src={baseImageData}
          width="1200"
          height="630"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            objectFit: "cover",
            zIndex: -1,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 300,
            backgroundColor: "#FFFF00",
            padding: "18px 22px 18px 22px",
            display: "flex",
            transform: "rotate(-3deg)",
            maxWidth: "825px",
            textAlign: "center",
            fontFamily: "Rubik",
            fontSize: fontSize + "px",
            fontOpticalSizing: "auto",
            fontStyle: "normal",
            fontWeight: 700,
          }}
        >
          <div
            style={{
              marginBottom: "-0.25em",
            }}
          >
            {constituencyName}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Rubik",
          data: rubikBoldFontData,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
