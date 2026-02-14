
export function validateRequiredFields(body, fields) {
  for (const field of fields) {
    if (!body[field]) return false;
  }
  return true;
}
