// Disable some linting rules which don't make sense in the context of generating an image
/* eslint @next/next/no-img-element: 0 */
/* eslint jsx-a11y/alt-text: 0 */

import { partyNameFromSlug } from "@/utils/Party";
import { getConstituencyData } from "@/utils/constituencyData";
import { ImageResponse } from "next/server";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
  /* Generates an opengraph image for the given constituencyName and partySlug.
   *
   * Uses Next.js ImageResponse:
   * https://nextjs.org/docs/app/api-reference/functions/image-response
   *
   * See examples of using this to generate OpenGraph images here:
   * https://vercel.com/docs/functions/og-image-generation/og-image-examples
   *
   * Note that while ImageResponse lets you render some HTML and output it as an image,
   * various functionality is not available - for example, you need to use inline styles
   * rather than the sitewide CSS / bootstrap, you need to load images & fonts in a
   * specific way, etc.
   */
  console.log(
    `CONSTITUENCY OPENGRAPH-IMAGE: Attempting to generate image for ${params.slug}`,
  );

  try {
    // This doesn't work, because uses fs and edge doesn't have it...
    // Would need to find another way to
    // const constituenciesData: ConstituencyData[] = await getConstituencyData();
    // const constituencyData = constituenciesData.filter(
    //   (c: ConstituencyData) => c.constituencyIdentifiers.slug === params.slug,
    // )[0];

    const constituencyData = await fetch(
      `/api/constituencies/${params.slug}`,
    ).then((res) => res.json());
    console.log(
      `CONSTITUENCY OPENGRAPH-IMAGE: Successfully fetched data from API for ${params.slug}`,
    );

    const constituencyName = constituencyData.constituencyIdentifiers.name;
    const partySlug = constituencyData.recommendation.partySlug;
    const partyName = partyNameFromSlug(partySlug as PartySlug);
    const partyColor = partyColorFromSlug(partySlug as PartySlug);
    console.log(
      `CONSTITUENCY OPENGRAPH-IMAGE: slug=${params.slug}, constituencyName=${constituencyName}, partySlug=${partySlug}, partyName=${partyName}, partyColor=${partyColor}`,
    );

    // const constituencyName = "TEST PCON";
    // const partyName = "TEST PARTY";
    // const partyColor = "red";

    const rubikBolderFontData = await fetch(
      new URL("/assets/fonts/Rubik-ExtraBold.woff", import.meta.url),
    ).then((res) => res.arrayBuffer());

    const baseImageData = await fetch(
      new URL("/assets/share-base-image-crowd-3.jpg", import.meta.url),
    ).then((res) => res.arrayBuffer());

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
  } catch (e: any) {
    console.log(
      `CONSTITUENCY OPENGRAPH-IMAGE: Error rendering image for ${params.slug}: ${e.message}`,
    );
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
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
