import { NextRequest, NextResponse } from 'next/server';
import { parse } from "postcode";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import path from "path";

// Force using 'nodejs' rather than 'edge' - edge won't have the filesystem containing SQLite
export const runtime = 'nodejs'

const fs = require("fs");

// Declare the DB outside the func & lazy-load, so it can be cached across calls
let db: Database | null = null;
const dbPath = path.join(process.cwd(), "data", "postcodes.db");
console.log(`***** dbPath is [${dbPath}] *****`);

// TODO: Handle errors and return appropriate errorMessage useful for debugging...!
// TODO: Next.js doesn't cache POSTs - potentially change to a GET of format:
// constituency_lookup/{postcode}/{addressSlug}
// which should enable caching
export async function POST(request: NextRequest) {
  console.log("IN SERVER FUNCTION");
  console.log(request);

  const requestBody: ConstituencyLookupRequest = await request.json();
  console.log(requestBody);

  console.log("***** FILES IN DATA DIRECTORY *****");
  fs.readdirSync(path.join(process.cwd(), "data")).forEach((file: any) => {
    console.log(file);
  });

  // Validate postcode
  console.time("validate-postcode");
  const postcode = parse(requestBody.postcode.trim() || "");
  console.timeEnd("validate-postcode");

  if (!postcode.valid) {
    console.log(`Postcode ${requestBody.postcode} is not valid!`);
    const response: ConstituencyLookupResponse = {
      postcode: requestBody.postcode,
      addressSlug: requestBody.addressSlug,
      constituencies: [],
      errorCode: "POSTCODE_INVALID",
    }
    return NextResponse.json(response);
  }


  // Remove whitespace from postcode to match the format in our database
  const normalized_postcode = postcode.postcode.replace(/\s+/g, "");

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
    normalized_postcode,
  );
  console.timeEnd("query-postcode-database");

  console.log(`Found constituencues ${constituencies} from database`);

  if (!constituencies || constituencies.length == 0) {
    console.log(`Postcode ${normalized_postcode} not found in DB!`);
    const response: ConstituencyLookupResponse = {
      postcode: requestBody.postcode,
      addressSlug: requestBody.addressSlug,
      constituencies: [],
      errorCode: "POSTCODE_NOT_FOUND",
    }
    return NextResponse.json(response);
  }

  if (constituencies.length == 1) {
    console.log(
      `Single constituency found for postcode ${normalized_postcode}`,
    );
    const response: ConstituencyLookupResponse = {
      postcode: requestBody.postcode,
      addressSlug: requestBody.addressSlug,
      constituencies: constituencies,
    }
    return NextResponse.json(response);
  } else {
    // TODO: Use DemocracyClub API to lookup postcode and populate the addresses array, so users can select their
    // specific address, rather than us expecting to know (or find out) their constituency.
    console.log(
      `Multiple constituencies found for postcode ${normalized_postcode}`,
    );
    const response: ConstituencyLookupResponse = {
      postcode: requestBody.postcode,
      addressSlug: requestBody.addressSlug,
      constituencies: constituencies,
    }
    return NextResponse.json(response);
  }
}
