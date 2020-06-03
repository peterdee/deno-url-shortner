import Request from 'https://deno.land/x/pogo/lib/request.ts';
import Response from 'https://deno.land/x/pogo/lib/response.ts';
import { Status } from 'https://deno.land/std/http/http_status.ts';
import Toolkit from 'https://deno.land/x/pogo/lib/toolkit.ts';

import { basic, serverError } from '../utils/responses.ts';
import database from '../database/index.ts';
import sanitize from '../utils/sanitize.ts';
import { URLRecord } from '../database/types.ts';

/**
 * Redirect the short URL to the original URL
 * @param {Request} request - request object
 * @param {Toolkit} tk - response toolkit
 * @returns {Promise<Response|*>}
 */
export default async (request: Request, tk: Toolkit): Promise<Response> => {
  try {
    // check data
    const { params: { id = '' } = {} } = request;
    const trimmedID = sanitize(id.trim());
    if (!trimmedID) {
      return basic(tk, Status.BadRequest, 'MISSING_DATA');
    }

    // get the record
    const URLRecords = database.collection('URLRecords');
    const record: URLRecord = await URLRecords.findOne({
      short: trimmedID,
    });
    if (!record) {
      // TODO: redirect to the frontend
      return basic(tk, Status.NotFound, 'LINK_NOT_FOUND');
    }

    // update the record
    await URLRecords.updateOne(
      {
        short: trimmedID,
      },
      {
        clicks: record.clicks + 1,
      },
    );

    // redirect to the original URL
    return tk.redirect(record.url);
  } catch (error) {
    return serverError(tk);
  }
};
