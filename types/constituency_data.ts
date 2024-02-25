type ConstituencyData = {
  constituencyIdentifiers: ConstituencyIdentifiers;
  recommendation: Recommendation;
  impliedPreviousResult: VoteResult;
  pollingResults: VoteResult;
};

type ConstituencyIdentifiers = {
  slug: string;
  name: string;
  mySocietyCode: string;
};

type Recommendation = {
  partySlug: string;
  reason: string;
};

type VoteResult = {
  partyVoteResults: VoteResult[];
};

type PartyVoteResult = {
  partySlug: string;
  votePercent: number;
};
