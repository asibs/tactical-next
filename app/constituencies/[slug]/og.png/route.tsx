import {
  getConstituencyData,
  getConstituencySlugs,
} from "@/utils/constituencyData";
import { partyNameFromSlug } from "@/utils/Party";
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
    false,
  );

  const constituencyName = constituencyData.constituencyIdentifiers.name;
  const partyName = partyNameFromSlug(
    constituencyData.recommendation.partySlug,
  );
  const partyColor = partyColorFromSlug(
    constituencyData.recommendation.partySlug,
  );

  const rubikBoldFP = path.join(
    process.cwd(),
    "assets",
    "fonts",
    "Rubik-ExtraBold.woff",
  );
  const baseImgFP = path.join(
    process.cwd(),
    "assets",
    "share-base-image-crowd-with-logo.png",
  );
  const rubikBolderFontData = await fs.readFile(rubikBoldFP);
  const baseImageData = (await fs.readFile(baseImgFP)).buffer;

  console.log(
    `CONSTITUENCY OPENGRAPH-IMAGE: Rendering image for ${params.slug}`,
  );
  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "black",
          height: "100%",
          width: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          flexWrap: "nowrap",
        }}
      >
        {/*
          // @ts-ignore*/}
        <img width="1200" height="630" src={baseImageData} />

        <div
          style={{
            position: "absolute",
            top: "300px",
            left: 0,
            width: "100%",
            height: "180px",
            padding: "0 30px 30px 30px",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Rubik",
            fontSize: 60,
            fontStyle: "normal",
            fontWeight: 800,
            color: partyColor,
          }}
        >
          {`Vote ${partyName} in ${constituencyName}`}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "75px",
            left: 0,
            width: "100%",
            padding: "0 30px 0 30px",
            textAlign: "center",
            justifyContent: "center",
            fontFamily: "Rubik",
            fontSize: 60,
            fontStyle: "normal",
            fontWeight: 800,
            color: "#ff33ff",
          }}
        >
          Find out your tactical vote now!
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Rubik",
          data: rubikBolderFontData,
          style: "normal",
          weight: 800,
        },
      ],
    },
  );
}

// We can't use the normal partyColorFromSlug in /utils/Party.ts because
// ImageResponse doesn't have access to our CSS styles, so we need to
// hardcode specific color codes here.
const partyColorFromSlug = (slug: PartySlug): string => {
  switch (slug) {
    case "Con":
      return "#0087dc";
    case "Lab":
      return "#e4003b";
    case "LD":
      return "#faa61a";
    case "Green":
      return "#02a95b";
    case "SNP":
      return "#fcec50";
    case "PC":
      return "#005b54";
    case "Reform":
      return "#12b6cf";
    default:
      return "#e9ecef";
  }
};
