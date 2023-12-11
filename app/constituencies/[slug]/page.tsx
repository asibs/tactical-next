import { readFileSync } from "fs";
import { unstable_cache } from "next/cache";
import getConfig from "next/config";
import path from "path";

const { serverRuntimeConfig } = getConfig() || {};

const getConstituencyData = unstable_cache(
  // Cache data function
  async () => {
    console.debug(
      `constituencies/[slug]/page.tsx: Updating cached constituencies data`,
    );
    const filePath = path.join(process.cwd(), "data", "constituency.json");
    const fileContent = readFileSync(filePath, "utf8");
    return JSON.parse(fileContent);
  },
  // Cache key
  [`data/constituency.json.${serverRuntimeConfig.appVersion}`],
  // Cache options
  { revalidate: false }, // Cache will never refresh
);

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  // TODO: Call spreadsheet data module to reload & cache spreadsheet constituency data
  // const posts = await fetch('https://.../posts').then((res) => res.json())

  // TODO: Get constituencies from cached spreadsheet data
  // const constituencies = ["isle-of-wight-west", "isle-of-wight-east"];

  const constituenciesData = await getConstituencyData();

  return constituenciesData.map((c: any) => ({
    slug: c["slug"],
  }));
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function ConstituencyPage({
  params,
}: {
  params: { slug: string };
}) {
  const constituenciesData = await getConstituencyData();
  const constituencyData = constituenciesData.filter(
    (c: any) => c["slug"] === params.slug,
  )[0];

  return (
    <>
      <h1>{params.slug}</h1>
      <p>{JSON.stringify(constituencyData)}</p>
    </>
  );
}
