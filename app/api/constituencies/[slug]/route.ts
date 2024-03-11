import { partyNameFromSlug } from "@/utils/Party";
import { getConstituencyDataUncached } from "@/utils/constituencyData";
import { NextRequest } from "next/server";

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const constituenciesData: ConstituencyData[] =
    await getConstituencyDataUncached();

  return constituenciesData.map((c: ConstituencyData) => ({
    slug: c.constituencyIdentifiers.slug,
  }));
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  console.log(`GENERATING API RESPONSE FOR CONSTITUENCY ${params.slug}`);

  const constituenciesData: ConstituencyData[] =
    await getConstituencyDataUncached();
  console.log("Successfully fetched constituencies data");
  const constituencyData = constituenciesData.filter(
    (c: ConstituencyData) => c.constituencyIdentifiers.slug === params.slug,
  )[0];

  if (constituencyData) {
    console.log(
      `Found constituency data for ${params.slug}, constituencyIdentifiers ${
        constituencyData.constituencyIdentifiers
      }, partySlug ${
        constituencyData.recommendation.partySlug
      }, partyName ${partyNameFromSlug(
        constituencyData.recommendation.partySlug,
      )}`,
    );

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
