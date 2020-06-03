import * as bcrypt from 'https://deno.land/x/bcrypt/mod.ts';
import Request from 'https://deno.land/x/pogo/lib/request.ts';
import Response from 'https://deno.land/x/pogo/lib/response.ts';
import { Status } from 'https://deno.land/std/http/http_status.ts';
import Toolkit from 'https://deno.land/x/pogo/lib/toolkit.ts';

import { basic, serverError } from '../utils/responses.ts';
import bodyParser from '../utils/body-parser.ts';
import { DeleteURLData } from './types.ts';
import database from '../database/index.ts';
import sanitize from '../utils/sanitize.ts';
import { URLRecord } from '../database/types.ts';

/**
 * Delete short URL
 * @param {Request} request - request object
 * @param {Toolkit} tk - response toolkit
 * @returns {Promise<Response>}
 */
export default async (request: Request, tk: Toolkit): Promise<Response> => {
  try {
    // check the data
    const { params: { id = '' } = {} } = request;
    const { secret = '' }: DeleteURLData = await bodyParser(request, ['secret']);
    const trimmedID = sanitize(id.trim());
    const trimmedSecret = sanitize(secret.trim());
    if (!(trimmedID && trimmedSecret)) {
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

    // compare hashes
    const compare = await bcrypt.compare(trimmedSecret, record.secret);
    if (!compare) {
      return basic(tk, Status.Unauthorized, 'ACCESS_DENIED');
    }

    // delete the record
    await URLRecords.deleteOne({
      short: trimmedID,
    });

    return basic(tk, Status.OK, 'OK');
  } catch (error) {
    return serverError(tk);
  }
};
