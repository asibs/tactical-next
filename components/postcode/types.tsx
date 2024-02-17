type ServerActionData = {
  constituencies: Constituency[];
  addresses: Address[];
  errorMessage: string | null;
};

type Constituency = {
  name: string;
  slug: string;
};

type Address = {
  name: string;
  slug: string;
};
