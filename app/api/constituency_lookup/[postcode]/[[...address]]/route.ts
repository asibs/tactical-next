// import * as fs from 'fs';
import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import path from "path";
import { validatePostcode, normalizePostcode } from "@/utils/Postcodes";

// Force using 'nodejs' rather than 'edge' - edge won't have the filesystem containing SQLite
export const runtime = "nodejs";

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

  // Throw errors some of the time.
  //if ( Date.now() % 3 < 1) {
  //  console.log("400 ERROR RESPONSE");
  //  return new NextResponse("Error", { status: 400 })
  //}

  function sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  console.log(`${new Date().toLocaleString()} - SLEEPING`);
  await sleep(5000);
  console.log(`${new Date().toLocaleString()} - FINISHED SLEEPING`);

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
    // TODO: Use DemocracyClub API to lookup postcode and populate the addresses array, so users can select their
    // specific address, rather than us expecting to know (or find out) their constituency.
    console.log(
      `Multiple constituencies found for postcode ${normalizedPostcode}`,
    );
    const response: ConstituencyLookupResponse = {
      postcode: params.postcode,
      addressSlug: params.address?.[0],
      constituencies: constituencies,
    };
    return NextResponse.json(response);
  }
}
