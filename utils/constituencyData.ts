import { readFileSync } from "fs";
import path from "path";
import { unstable_cache } from "next/cache";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig() || {};

const getConstituencyData = unstable_cache(
  // Cache data function
  async () => getConstituencyDataUncached(),
  // Cache key
  [`data/constituency.json.${serverRuntimeConfig.appVersion}`],
  // Cache options
  { revalidate: false }, // Cache will never refresh
);

const getConstituencyDataUncached = async () => {
  console.debug("constituencyData: fetching constituencies data");
  const filePath = path.join(process.cwd(), "data", "constituency.json");
  const fileContent = readFileSync(filePath, "utf8");
  console.debug("constituencyData: fetched constituencies data from file");
  return JSON.parse(fileContent);
};

/**
 * Returns a measure of the majority achieved by the winning party in the given VoteResult.
 * The majority calculated by this method uses the delta between the _vote percent_ achieved
 * by the winning & runner-up parties. It uses vote percent because this is present on all
 * VoteResult objects. The absolute number of votes is not necessarily available on VoteResult
 * objects for predicted results based on polls, etc.
 */
const majority = (voteResult: VoteResult) => {
  const winner = voteResult.winningParty;
  const runnerUp = voteResult.partyVoteResults.sort(
    (a, b) => b.votePercent - a.votePercent,
  )[1].partySlug;

  const winnerVotePercent = votePercent(voteResult, winner);
  const runnerUpVotePercent = votePercent(voteResult, runnerUp);

  return winnerVotePercent - runnerUpVotePercent;
};

const votePercent = (voteResult: VoteResult, partySlug: string) => {
  return (
    voteResult.partyVoteResults.find(
      (partyResult) => partyResult.partySlug === partySlug,
    )?.votePercent || 0.0
  );
};

export {
  getConstituencyData,
  getConstituencyDataUncached,
  majority,
  votePercent,
};
