import Request from 'https://deno.land/x/pogo/lib/request.ts';
import Response from 'https://deno.land/x/pogo/lib/response.ts';
import { Status } from 'https://deno.land/std/http/http_status.ts';
import Toolkit from 'https://deno.land/x/pogo/lib/toolkit.ts';

import { basic, serverError } from '../utils/responses.ts';
import database from '../database/index.ts';
import { SerializedRecord } from './types.ts';
import serializeURLRecord from '../utils/serialize-url-record.ts';
import { URLRecord } from '../database/types.ts';

/**
 * Get short URL record by short ID
 * @param {Request} request - request object
 * @param {Toolkit} tk - response toolkit
 * @returns {Promise<Response>}
 */
export default async (request: Request, tk: Toolkit): Promise<Response> => {
  try {
    // check the data
    const { params: { id = '' } = {} } = request;
    const trimmedID = id.trim();
    if (!trimmedID) {
      return basic(tk, Status.BadRequest, 'MISSING_DATA');
    }

    // get the record
    const URLRecords = database.collection('URLRecords');
    const record: URLRecord = await URLRecords.findOne({
      short: trimmedID,
    });
    if (!record) {
      return basic(tk, Status.NotFound, 'LINK_NOT_FOUND');
    }

    // serialize the data
    const serialized: SerializedRecord = serializeURLRecord(record);

    return basic(tk, Status.OK, 'OK', serialized);
  } catch (error) {
    return serverError(tk);
  }
};
