import Response from 'https://deno.land/x/pogo/lib/response.ts';
import { Status } from 'https://deno.land/std/http/http_status.ts';
import Toolkit from 'https://deno.land/x/pogo/lib/toolkit.ts';

/**
 * Send the basic response
 * @param {Toolkit} tk - response toolkit (Pogo)
 * @param {number} status - response status
 * @param {string} info - response info 
 * @returns {Response}
 */
export const basic = (
  tk: Toolkit,
  status: number = Status.OK,
  info = 'OK',
): Response => tk.response({
  datetime: Date.now(),
  info,
  status,
}).code(status);

/**
 * Send the error response
 * @param {Toolkit} tk - response toolkit (Pogo)
 * @param {number} status - response status
 * @param {string} info - response info 
 * @returns {Response}
 */
export const error = (
  tk: Toolkit,
  status: number = 200,
  info = 'OK',
): Response => tk.response({
  datetime: Date.now(),
  info,
  status,
}).code(Status.OK);
