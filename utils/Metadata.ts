import { readFileSync } from "fs";
import path from "path";

type MetaDataObj = {
  description: string;
  url: string;
};

type MetaData = {
  implied_2019: MetaDataObj[];
  mrp_poll: MetaDataObj[];
  party_target_seats: MetaDataObj[];
};

const getMetadata = (): MetaData => {
  const filePath = path.join(process.cwd(), "data", "metadata.json");
  const fileContent = readFileSync(filePath, "utf8");
  return JSON.parse(fileContent);
};

export { getMetadata };
