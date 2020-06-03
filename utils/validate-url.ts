/**
 * Validate a URL
 * @param {string} string - URL address to validate
 * @returns {boolean}
 */
export default (string: string = ''): boolean => {
  // check for the protocol first
  const protocols: string[] = ['http', 'https'];
  const [protocol] = string.split('://');
  if (!protocols.includes(protocol)) return false;

  // check the rest of the URL
  const pattern: RegExp = new RegExp('^(https?:\\/\\/)?' +
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
    '((\\d{1,3}\\.){3}\\d{1,3}))' +
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
    '(\\?[;&a-z\\d%_.~+=-]*)?' +
    '(\\#[-a-z\\d_]*)?$', 'i');
  return !!pattern.test(string);
};
