import Response from 'https://deno.land/x/pogo/lib/response.ts';
import { Status } from 'https://deno.land/std/http/http_status.ts';
import Toolkit from 'https://deno.land/x/pogo/lib/toolkit.ts';

import { BasicResponse } from './types.ts';

/**
 * Send the basic response
 * @param {Toolkit} tk - response toolkit (Pogo)
 * @param {number} status - response status
 * @param {string} info - response info
 * @param {*} data - data object (optional)
 * @returns {Response} 
 */
export const basic = (
  tk: Toolkit,
  status: number = Status.OK,
  info = 'OK',
  data = {},
): Response => {
  const body: BasicResponse = {
    datetime: Date.now(),
    info,
    status,
  };
  
  if (data && Object.keys(data).length > 0) {
    body.data = { ...data };
  }

  const response = tk.response(body);

  // enable CORS
  response.headers.append('access-control-allow-origin', '*');
  response.headers.append(
    'access-control-allow-headers',
    'Origin, X-Requested-With, Content-Type, Accept, Range',
  );

  return response.code(status);
};

/**
 * Send the server error response
 * @param {Toolkit} tk - response toolkit (Pogo)
 * @returns {Response}
 */
export const serverError = (tk: Toolkit): Response => tk.response({
  datetime: Date.now(),
  info: 'INTERNAL_SERVER_ERROR',
  status: Status.InternalServerError,
}).code(Status.InternalServerError);
