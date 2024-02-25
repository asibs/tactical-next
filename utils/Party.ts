const partyNameFromSlug = (slug: string) => {
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
      "Other";
  }
}

const partyCssClassFromSlug = (slug: string) => {
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
      "";
  }
}

export {
  partyNameFromSlug,
  partyCssClassFromSlug,
};