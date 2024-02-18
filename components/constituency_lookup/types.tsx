// Types used by ConstituencyLookup component and API

type Constituency = {
  name: string;
  slug: string;
};

type Address = {
  name: string;
  slug: string;
};

type ErrorCode = "POSTCODE_INVALID" | "POSTCODE_NOT_FOUND"

type ConstituencyLookupRequest = {
  postcode: string;
  addressSlug: string | null;
  constituencySlug: string | null;
}

type ConstituencyLookupResponse = {
  constituencies: Constituency[];
  addresses: Address[];
  errorMessage: ErrorCode;
};