const toTitleCase = (inputStr: string) => {
  return inputStr.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
}

export { toTitleCase }