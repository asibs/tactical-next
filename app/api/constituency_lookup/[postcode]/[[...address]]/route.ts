// import * as fs from 'fs';
import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import path from "path";
import { validatePostcode, normalizePostcode } from "@/utils/Postcodes";

// Force using 'nodejs' rather than 'edge' - edge won't have the filesystem containing SQLite
export const runtime = "nodejs";
export const revalidate = 3600;

type DCData = {
  boundary_changes?: {
    current_constituencies_official_identifier: string;
    current_constituencies_name: string;
    new_constituencies_official_identifier: string;
    new_constituencies_name: string;
    CHANGE_TYPE: string;
  };
  addresses?: {
    address: string;
    postcode: string;
    slug: string;
    url: string;
  }[];
};

const dc_base_url = "https://developers.democracyclub.org.uk/api/v1/";
const dc_params =
  "/?" +
  new URLSearchParams({
    auth_token: process.env.DC_API_KEY || "",
    parl_boundaries: "1",
  }).toString();

async function fetch_dc_api(
  postcode: string,
  addressSlug?: string,
): Promise<DCData | null> {
  const dc_url =
    dc_base_url +
    (addressSlug ? "address/" + addressSlug : "postcode/" + postcode) +
    dc_params;

  const dc_res = await fetch(dc_url, { signal: AbortSignal.timeout(5000) });

  if (dc_res.ok) {
    const dc_json = await dc_res.json();
    if (
      !addressSlug &&
      dc_json.address_picker &&
      dc_json.addresses.length > 0
    ) {
      return { addresses: dc_json.addresses };
    } else if (dc_json.parl_boundary_changes) {
      return { boundary_changes: dc_json.parl_boundary_changes };
    } else {
      console.log("DC No Useful Response", await dc_res.json());
      return null;
    }
  } else {
    console.log("DC ERROR", await dc_res.text());
    return null;
  }
}

// Declare the DB outside the func & lazy-load, so it can be cached across calls
let db: Database | null = null;
const dbPath = path.join(process.cwd(), "data", "postcodes.db");
console.log(`***** dbPath is [${dbPath}] *****`);

// TODO: Handle errors and return appropriate errorMessage useful for debugging...!
export async function GET(
  request: NextRequest,
  { params }: { params: { postcode: string; address?: string[] } },
) {
  console.log("IN SERVER FUNCTION");

  // console.log("***** FILES IN DATA DIRECTORY *****");
  // fs.readdirSync(path.join(process.cwd(), "data")).forEach((file: any) => {
  //   console.log(`- ${file}`);
  // });

  //read & normalize postcode
  const normalizedPostcode = normalizePostcode(params.postcode);

  //validate the postcode
  if (!normalizedPostcode || !validatePostcode.test(normalizedPostcode)) {
    console.log(`Postcode ${params.postcode} is not valid!`);
    const response: ConstituencyLookupResponse = {
      postcode: params.postcode,
      constituencies: [],
      errorCode: "POSTCODE_INVALID",
    };
    return NextResponse.json(response);
  }

  // Initialise the database if necessary
  if (!db) {
    console.log("Initialising postcode SQLite database");
    console.time("initialise-postcode-database");
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    console.timeEnd("initialise-postcode-database");
  }

  // Query the database
  console.time("query-postcode-database");
  const constituencies = await db.all(
    `SELECT
      pcon.gss,
      pcon.slug,
      pcon.name
    FROM postcode_lookup
    JOIN pcon ON postcode_lookup.pcon_id = pcon.id
    WHERE postcode_lookup.postcode = ?
    ORDER BY postcode_lookup.confidence DESC`,
    normalizedPostcode,
  );
  console.timeEnd("query-postcode-database");

  if (!constituencies || constituencies.length == 0) {
    console.log(`Postcode ${normalizedPostcode} not found in DB!`);
    const response: ConstituencyLookupResponse = {
      postcode: params.postcode,
      addressSlug: params.address?.[0],
      constituencies: [],
      errorCode: "POSTCODE_NOT_FOUND",
    };
    return NextResponse.json(response);
  }

  if (constituencies.length == 1) {
    console.log(`Single constituency found for postcode ${normalizedPostcode}`);
    const response: ConstituencyLookupResponse = {
      postcode: params.postcode,
      addressSlug: params.address?.[0],
      constituencies: constituencies,
    };
    return NextResponse.json(response);
  } else {
    console.log(
      `Multiple constituencies found for postcode ${normalizedPostcode}`,
    );

    const response: ConstituencyLookupResponse = {
      postcode: params.postcode,
      addressSlug: params.address?.[0],
      constituencies: constituencies,
    };

    //see if DC api will give us anything useful
    //TODO remove this if statement, (here so we can test DC API failure!)
    let dc_data = null;
    if (normalizedPostcode != "DE30GU")
      dc_data = await fetch_dc_api(normalizedPostcode, params.address?.[0]);

    //const dc_data = await fetch_dc_api(normalizedPostcode, params.address?.[0]);

    // See if DC data can return a more useful response.
    // Possibly it just matches 1 constituency in which case return that
    // Possibly it gives us an address picker which we can return.
    if (dc_data?.boundary_changes) {
      //Democracy Club data shows this postcode has a single constituency
      const gss =
        dc_data.boundary_changes.new_constituencies_official_identifier.substring(
          4,
        );
      const dc_constituency = constituencies.filter((c) => c.gss === gss);

      if (dc_constituency.length === 1) {
        response.constituencies = dc_constituency;
      } else {
        console.log(JSON.stringify(dc_data));
        console.log(
          "DC returned boundary change data but it didn't match a single db record??",
        );
      }
    } else if (dc_data?.addresses && dc_data.addresses.length > 0) {
      response.addresses = dc_data.addresses.map((addr) => ({
        name: addr.address,
        slug: addr.slug,
      }));
    }

    // TODO: Use DemocracyClub API to lookup postcode and populate the addresses array, so users can select their
    // specific address, rather than us expecting to know (or find out) their constituency.
    return NextResponse.json(response);
  }
}
