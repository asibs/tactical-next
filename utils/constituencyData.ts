import constituencyJson from "@/data/constituency.json";

const getConstituencyData = (constituencySlug: string) => {
  const constituenciesData = getConstituenciesData();
  const constituencyData = constituenciesData.find(
    (c: ConstituencyData) =>
      c.constituencyIdentifiers.slug === constituencySlug,
  );

  if (!constituencyData) {
    throw new Error(
      `getConstituencyData: Unable to find constituencySlug=${constituencySlug}`,
    );
  }

  return constituencyData;
};

const getConstituencySlugs = (): string[] => {
  const constituenciesData = getConstituenciesData();
  return constituenciesData.map(
    (c: ConstituencyData) => c.constituencyIdentifiers.slug,
  );
};

const getConstituenciesData = (): ConstituencyData[] => {
  // Have to typecast as the json load doesn't know about our enums
  return constituencyJson as ConstituencyData[];
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
  getConstituencySlugs,
  getConstituencyData,
  getConstituenciesData,
  majority,
  votePercent,
};
