// Types used by ConstituencyLookup component and constituency lookup API route:
// components/constituency_lookup/ConstituencyLookup.tsx
// app/api/constituency_lookup/route.ts


// TODO: Shift these somewhere else (inside forms folder?)
type Constituency = {
  name: string;
  slug: string;
  gss?: string;
};

type Address = {
  name: string;
  slug: string;
};

type ServerPostcodeErrorCode =
  | "POSTCODE_INVALID"
  | "POSTCODE_NOT_FOUND"
  | "SERVER_ERROR";
type PostCodeErrorCode = ServerPostcodeErrorCode | "UNCLEAR_CONSTITUENCY";

type EmailErrorCode = "EMAIL_INVALID" | "SERVER_ERROR";

type ConstituencyLookupResponse = {
  postcode: string;
  addressSlug?: string;
  constituencies: Constituency[];
  addresses?: Address[];
  errorCode?: ServerPostcodeErrorCode;
  errorMessage?: string;
};
