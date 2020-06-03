/**
 * Sanitize inputs (prevent NoSQL injection)
 * @param {*} data - input data
 * @returns {*}
 */
function sanitize(data: any): any {
  if (data instanceof Object) {
    for (const key in data) {
      if (/^\$/.test(key)) {
        delete data[key];
      } else {
        sanitize(data[key]);
      }
    }
  }
  return data;
}

export default sanitize;
