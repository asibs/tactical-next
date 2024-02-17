import { Col, Container, Row, Form, Button, FormCheck } from "react-bootstrap";
import { useFormState, useFormStatus } from "react-dom";

import { parse } from "postcode";

import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import path from "path";
import { redirect } from "next/navigation";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";

import rubik from "@/utils/Fonts";

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

  if (!constituencies || constituencies.length == 0) {
    console.log(`Postcode ${postcode.postcode} not found in DB!`);
    return { message: "Oops, we can't find that postcode..." };
  }

  console.log(constituencies);
  console.log(constituencies[0]["slug"]);
  redirect(`/constituencies/${constituencies[0]["slug"]}`);
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
  // const [state, formAction] = useFormState<State, FormData>(lookupPostcode, initialFormState)

  {
    /* useState requires it to be a client-component */
  }
  {
    /* const [emailOptIn, setEmailOptIn] = useState(false); */
  }
  const emailOptIn = true;

  return (
    <Container
      className="rounded-3 bg-pink-strong p-3 mb-4 shadow text-100"
      style={{ fontSize: "18px" }}
    >
      <Form action={lookupPostcode}>
        <h3 className={`${rubik.className} fw-bolder`}>VOTE THE TORIES OUT</h3>
        <p className="fw-bold text-900">
          Vote tactically at the General Election
        </p>

        <Form.Control
          id="postcode"
          name="postcode"
          size="lg"
          type="text"
          placeholder="Your Postcode"
        />

        {/* TODO: Show constituency/address drop-down if more than one possibility */}

        {/* Checkbox requires it to be a client-component */}
        {/* <FormCheck id="email-opt-in">
          <div onChange={() => setEmailOptIn(!emailOptIn)}>
            <FormCheckInput checked={emailOptIn} />
            <FormCheckLabel className="ps-2">
              <strong>Join with your email</strong> to stick together
            </FormCheckLabel>
          </div>
        </FormCheck> */}

        {emailOptIn && (
          <>
            <Form.Control
              id="email"
              name="email"
              size="lg"
              type="text"
              placeholder="Your Email"
            />
            <p style={{ fontSize: "0.75em" }}>
              We store your email address, postcode, and constituency, so we can
              send you exactly the information you need, and the actions to
              take.
            </p>
          </>
        )}

        <Button variant="primary" type="submit" aria-disabled={false}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default PostcodeLookup;
