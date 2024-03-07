// Types used by ConstituencyLookup component and constituency lookup API route:
// components/constituency_lookup/ConstituencyLookup.tsx
// app/api/constituency_lookup/route.ts

type Constituency = {
  name: string;
  slug: string;
  gss: string;
};

type Address = {
  name: string;
  slug: string;
};

type ErrorCode = "POSTCODE_INVALID" | "POSTCODE_NOT_FOUND" | "SERVER_ERROR";

type ConstituencyLookupResponse = {
  postcode: string;
  addressSlug?: string;
  constituencies: Constituency[];
  addresses?: Address[];
  errorCode?: ErrorCode;
  errorMessage?: string;
};
