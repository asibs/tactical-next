// Top-level type for all constituency data, which we use to statically generate our constituency pages
type ConstituencyData = {
  constituencyIdentifiers: ConstituencyIdentifiers;
  recommendation: Recommendation;
  impliedPreviousResult: VoteResult;
  pollingResults: VoteResult;
};

// Strings used to identify constituencies
type ConstituencyIdentifiers = {
  slug: string;
  name: string;
  mySocietyCode: string;
};

// Data about the tactical recommendation we're using
type Recommendation = {
  partySlug: string;
  reason: string;
};

// An election "result" - note this encompasses:
// - Real results - an actual election happened with the same boundary
// - Implied - an election happened, but with different boundaries, so a calculation has been done
//   to work out the _implied_ result with the new boundaries
// - Predicted - polling carried out gives us an indicative idea of the result of an upcoming
//   election
type VoteResult = {
  partyVoteResults: VoteResult[];
  // In future we may want to add other data like turnout
};

// The vote a single party achieved in a given VoteResult
type PartyVoteResult = {
  partySlug: string;
  votePercent: number;
  // In future we might want to add other data like actual vote count, candidate name(s), etc
};
