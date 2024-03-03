const partyNameFromSlug = (slug: PartySlug): string => {
  switch (slug) {
    case "Con":
      return "Conservative";
    case "Lab":
      return "Labour";
    case "LD":
      return "Liberal Democrat";
    case "Green":
      return "Green";
    case "SNP":
      return "SNP";
    case "PC":
      return "Plaid Cymru";
    case "Reform":
      return "Reform UK";
    case "NonVoter":
      return "Didn't Vote";
    default:
      return "Other";
  }
};

const shortPartyNameFromSlug = (slug: PartySlug): string => {
  switch (slug) {
    case "Con":
      return "Tory";
    case "Lab":
      return "Labour";
    case "LD":
      return "Lib Dem";
    case "Green":
      return "Green";
    case "SNP":
      return "SNP";
    case "PC":
      return "Plaid";
    case "Reform":
      return "Reform";
    case "NonVoter":
      return "Didn't Vote";
    default:
      return "Other";
  }
};

const partyColorFromSlug = (slug: PartySlug) => {
  switch (slug) {
    case "Con":
      return "var(--con-party-color)";
    case "Lab":
      return "var(--lab-party-color)";
    case "LD":
      return "var(--ld-party-color)";
    case "Green":
      return "var(--green-party-color)";
    case "SNP":
      return "var(--snp-party-color)";
    case "PC":
      return "var(--pc-party-color)";
    case "Reform":
      return "var(--reform-party-color)";
    case "NonVoter":
      return "var(--mvtfwd-pink-strong)";
    case "Other":
      return "var(--other-party-color)";
    default:
      return "var(--bs-black)";
  }
};

const partyCssClassFromSlug = (slug: PartySlug) => {
  // TODO: Styles for SNP/Plaid (and Reform?)
  switch (slug) {
    case "Con":
      return "party-conservative";
    case "Lab":
      return "party-labour";
    case "LD":
      return "party-libdem";
    case "Green":
      return "party-green";
    case "SNP":
      return "party-snp";
    case "PC":
      return "party-pc";
    case "Reform":
      return "party-reform";
    default:
      return "";
  }
};

export {
  partyColorFromSlug,
  partyNameFromSlug,
  shortPartyNameFromSlug,
  partyCssClassFromSlug,
};
