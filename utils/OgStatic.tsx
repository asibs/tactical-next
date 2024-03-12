import satori from "satori";
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { partyNameFromSlug } from "@/utils/Party";

const generateOG = async (constituency: ConstituencyData) => {
  try {
    const rubikBoldFP = path.join(
      process.cwd(),
      "assets",
      "fonts",
      "Rubik-ExtraBold.woff",
    );
    const baseImgFP = path.join(
      process.cwd(),
      "assets",
      "share-base-image-crowd-2.jpg",
    );
    const rubikBolderFontData = readFileSync(rubikBoldFP);
    const baseImageData = readFileSync(baseImgFP).buffer;
    const slug = constituency.constituencyIdentifiers.slug;
    const constituencyName = constituency.constituencyIdentifiers.name;
    const partySlug = constituency.recommendation.partySlug;

    const outPath = path.join(
      process.cwd(),
      "public",
      "og",
      "og-" + slug + ".svg",
    );

    console.log("OG STATIC TEST:");
    console.log("outPath: ", outPath.toString());

    if (!constituencyName || !partySlug) {
      return false;
    }
    const partyName = partyNameFromSlug(partySlug as PartySlug);
    const partyColor = partyColorFromSlug(partySlug as PartySlug);

    const svg = await satori(
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
      </div>,
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

    writeFileSync(outPath, svg);

    console.log("Generated static OG SVG");
    return true;
  } catch (e: any) {
    console.log(`${e.message}`);
    return false;
  }
};

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

export { generateOG };
