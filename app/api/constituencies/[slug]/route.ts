import { partyNameFromSlug } from "@/utils/Party";
import {
  getConstituencyData,
  getConstituencySlugs,
} from "@/utils/constituencyData";
import { NextRequest } from "next/server";

export const dynamic = "error"; // Error unless rendering statically
export const dynamicParams = false; // Don't allow params not in generateStaticParams
export const revalidate = false; // Never revalidate, always use cached version

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const constituencySlugs = await getConstituencySlugs();
  return constituencySlugs.map((slug) => ({ slug: slug }));
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  const constituencyData: ConstituencyData = getConstituencyData(params.slug);

  if (constituencyData) {
    /*    console.log(
      `Found constituency data for ${params.slug},
      constituencyIdentifiers ${constituencyData.constituencyIdentifiers},
      partySlug ${constituencyData.recommendation.partySlug},
      partyName ${partyNameFromSlug(
        constituencyData.recommendation.partySlug,
      )}`,
    );
*/
    return Response.json({
      constituencyIdentifiers: constituencyData.constituencyIdentifiers,
      recommendation: {
        partySlug: constituencyData.recommendation.partySlug,
        partyName: partyNameFromSlug(constituencyData.recommendation.partySlug),
      },
    });
  } else {
    console.log(`No constituency data found for ${params.slug}`);
    return new Response(null, { status: 404 });
  }
}
