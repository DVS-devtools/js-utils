/**
 * Normalize a value that could be a stringyfied JSON
 * @param value
 */
export const tryParse = (value: any): any => {
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};
