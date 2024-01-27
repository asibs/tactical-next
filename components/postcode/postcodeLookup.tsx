import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useFormState, useFormStatus } from "react-dom";

import { parse } from "postcode";

import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import path from "path";
import { redirect } from "next/navigation";

// Let's initialize it as null initially, and we will assign the actual database instance later.
let db: Database | null = null;
const dbPath = path.join(process.cwd(), "data", "postcodes.db");

async function lookupPostcode(formData: FormData): Promise<State> {
  "use server";

  console.log("IN SERVER FUNCTION");
  console.log(formData);
  console.log(formData.get("postcode"));

  // Validate postcode
  console.time("validate-postcode");
  const postcode = parse(formData.get("postcode")?.toString() || "");
  console.timeEnd("validate-postcode");

  if (!postcode.valid) {
    console.log(`Postcode ${formData.get("postcode")} is not valid!`);
    return { message: "Oops, that postcode doesn't look right to us..." };
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
  const row = await db.get(
    "SELECT * FROM postcode_lookup WHERE postcode = ?",
    postcode.postcode,
  );
  console.timeEnd("query-postcode-database");

  if (!row) {
    console.log(`Postcode ${postcode.postcode} not found in DB!`);
    return { message: "Oops, we can't find that postcode..." };
  }

  console.log(row);
  console.log(row["constituency_shortcode"]);
  redirect(`/constituencies/${row["constituency_shortcode"]}`);
}

type State = {
  message: string | null;
};

const initialState: State = {
  message: null,
};

const PostcodeLookup = () => {
  // const { pending } = useFormStatus()
  // https://github.com/vercel/next.js/issues/55919
  // const [state, formAction] = useFormState<State, FormData>(lookupPostcode, initialState)

  return (
    <Container>
      <Form action={lookupPostcode}>
        <Form.Control
          id="postcode"
          name="postcode"
          size="lg"
          type="text"
          placeholder="Postcode"
        />
        <Button variant="primary" type="submit" aria-disabled={false}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default PostcodeLookup;
