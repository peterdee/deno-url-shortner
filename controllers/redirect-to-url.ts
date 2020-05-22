import Request from 'https://deno.land/x/pogo/lib/request.ts';
import { Status } from 'https://deno.land/std/http/http_status.ts';
import Toolkit from 'https://deno.land/x/pogo/lib/toolkit.ts';

import { basic, serverError } from '../utils/responses.ts';
import database from '../database/index.ts';
import { URLRecord } from '../database/types.ts';

/**
 * Redirect the short URL to the original URL
 * @param {Request} request - request object
 * @param {Toolkit} tk - response toolkit
 * @returns {Promise<*>}
 */
export default async (request: Request, tk: Toolkit) => {
  try {
    // check data
    const { params: { id = '' } = {} } = request;
    if (!id) {
      return basic(tk, Status.BadRequest, 'MISSING_DATA');
    }

    // load collection
    const URLRecords = database.collection('URLRecords');

    // get the record
    const record: URLRecord = await URLRecords.findOne({
      short: id,
    });
    if (!record) {
      // TODO: redirect to the frontend
      return basic(tk, Status.NotFound, 'LINK_NOT_FOUND');
    }

    // redirect to the original URL
    return tk.redirect(record.url);
  } catch (error) {
    return serverError(tk);
  }
};
