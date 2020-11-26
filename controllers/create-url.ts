import * as bcrypt from 'https://deno.land/x/bcrypt@v0.2.2/mod.ts';
import { cuid } from 'https://deno.land/x/cuid@v1.0.0/index.js';
import Request from 'https://deno.land/x/pogo/lib/request.ts';
import Response from 'https://deno.land/x/pogo/lib/response.ts';
import { Status } from 'https://deno.land/std/http/http_status.ts';
import Toolkit from 'https://deno.land/x/pogo/lib/toolkit.ts';

import { basic, serverError } from '../utils/responses.ts';
import bodyParser from '../utils/body-parser.ts';
import { CreateURLData, SerializedRecord } from './types.ts';
import database from '../database/index.ts';
import sanitize from '../utils/sanitize.ts';
import serializeURLRecord from '../utils/serialize-url-record.ts';
import { URLRecord } from '../database/types.ts';
import validate from '../utils/validate-url.ts';

/**
 * Create a new short URL
 * @param {Request} request - request object
 * @param {Toolkit} tk - response toolkit
 * @returns {Promise<Response>}
 */
export default async (request: Request, tk: Toolkit): Promise<Response> => {
  try {
    // check the data
    const { secret = '', url = '' }: CreateURLData = await bodyParser(request, ['secret', 'url']);
    const trimmedSecret = sanitize(secret.trim());
    const trimmedURL = sanitize(url.trim());
    if (!(trimmedSecret && trimmedURL)) {
      return basic(tk, Status.BadRequest, 'MISSING_DATA');
    }

    // validate URL
    if (!validate(trimmedURL)) {
      return basic(tk, Status.BadRequest, 'INVALID_URL');
    }

    // hash the secret
    const hash = await bcrypt.hash(trimmedSecret);

    // create a new record and get back the ID
    const now = `${Date.now()}`;
    const URLRecords = database.collection('URLRecords');
    const recordId = await URLRecords.insertOne({
      clicks: 0,
      created: now,
      secret: hash,
      short: cuid.slug(),
      updated: now,
      url: trimmedURL,
    });

    // get the record itself
    const record: URLRecord = await URLRecords.findOne({
      _id: {
        '$oid': recordId['$oid'],
      },
    });

    // serialize the data
    const serialized: SerializedRecord = serializeURLRecord(record);

    return basic(tk, Status.OK, 'OK', serialized);
  } catch (error) {
    return serverError(tk);
  }
};
