"use server";

import { parse } from "postcode";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import path from "path";
import { redirect } from "next/navigation";

// Declare the DB outside the func & lazy-load, so it can be cached across calls
let db: Database | null = null;
const dbPath = path.join(process.cwd(), "data", "postcode-lookup.db");

async function lookupPostcode(formData: FormData): Promise<ServerActionData> {
  console.log("IN SERVER FUNCTION");
  console.log(formData);
  console.log(formData.get("postcode"));

  // Validate postcode
  console.time("validate-postcode");
  const postcode = parse(formData.get("postcode")?.toString() || "");
  console.timeEnd("validate-postcode");

  if (!postcode.valid) {
    console.log(`Postcode ${formData.get("postcode")} is not valid!`);
    return { constituencies: [], addresses: [], errorMessage: "Oops, that postcode doesn't look right to us. Try again, or contact us." };
  }

  // Remove whitespace from postcode to match the format in our database
  const normalized_postcode = postcode.postcode.replace(/\s+/g, '')

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
    normalized_postcode
  )
  console.timeEnd("query-postcode-database");

  console.log(constituencies)

  if (!constituencies || constituencies.length == 0) {
    console.log(`Postcode ${normalized_postcode} not found in DB!`);
    return { constituencies: [], addresses: [], errorMessage: "Oops, that postcode doesn't look right to us. Try again, or contact us." };
  }

  if (constituencies.length == 1) {
    console.log(`Single constituency found for postcode ${normalized_postcode}`)
    // redirect(`/constituencies/${rows[0]["slug"]}`);
    return { constituencies: constituencies, addresses: [], errorMessage: null };
  } else {
    // TODO: Use DemocracyClub API to lookup postcode and populate the addresses array, so users can select their
    // specific address, rather than us expecting to know (or find out) their constituency.
    console.log(`Multiple constituencies found for postcode ${normalized_postcode}`)
    return { constituencies: constituencies, addresses: [], errorMessage: null };
  }
}

export default lookupPostcode;
