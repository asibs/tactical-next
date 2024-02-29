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
    default:
      return "Other";
  }
};

const partyColorFromSlug = (slug: PartySlug) => {
  switch (slug) {
    case "Con":
      return "var(--bs-blue)";
    case "Lab":
      return "var(--bs-red)";
    case "LD":
      return "var(--bs-orange)";
    case "Green":
      return "var(--bs-green)";
    case "SNP":
      return "var(--bs-yellow)";
    case "PC":
      return "#005B54";
    case "Reform":
      return "";
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
      return "";
    case "PC":
      return "";
    case "Reform":
      return "";
    default:
      return "";
  }
};

export { partyColorFromSlug, partyNameFromSlug, partyCssClassFromSlug };
