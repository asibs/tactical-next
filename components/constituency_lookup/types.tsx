// Types used by ConstituencyLookup component and constituency lookup API route:
// components/constituency_lookup/ConstituencyLookup.tsx
// app/api/constituency_lookup/route.ts

type Constituency = {
  name: string;
  slug: string;
};

type Address = {
  name: string;
  slug: string;
};

type PostCodeErrorCode =
  | "POSTCODE_INVALID"
  | "POSTCODE_NOT_FOUND"
  | "SERVER_ERROR";
type AllPostCodeErrorCode = PostCodeErrorCode | "UNCLEAR_CONSTITUENCY";

type EmailErrorCode = "EMAIL_INVALID" | "SERVER_ERROR";

type ConstituencyLookupResponse = {
  postcode: string;
  addressSlug?: string;
  constituencies: Constituency[];
  addresses?: Address[];
  errorCode?: PostCodeErrorCode;
  errorMessage?: string;
};
