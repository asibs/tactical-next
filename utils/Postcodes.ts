const sanitizePostcode = new RegExp(/[^a-zA-Z0-9]/g);
const validatePostcode = new RegExp(/^[A-Z]{1,2}\d[A-Z\d]?\d[A-Z]{2}$/);
const postcodeInputPattern =
  "^\\s*[A-Za-z]{1,2}\\d[A-Za-z\\d]?\\s*\\d[A-Za-z]{2}\\s*$";

const normalizePostcode = (postcode: string) => {
  return postcode.replaceAll(sanitizePostcode, "").toUpperCase();
};

export {
  normalizePostcode,
  validatePostcode,
  sanitizePostcode,
  postcodeInputPattern,
};
