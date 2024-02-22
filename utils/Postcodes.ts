const sanitizePostcode = new RegExp(/[^a-zA-Z0-9]/g);
const validatePostcode = new RegExp(/^[A-Z]{1,2}\d[A-Z\d]?\d[A-Z]{2}$/);

export { sanitizePostcode, validatePostcode };
