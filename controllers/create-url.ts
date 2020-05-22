import * as bcrypt from 'https://deno.land/x/bcrypt/mod.ts';
import { cuid } from 'https://deno.land/x/cuid@v1.0.0/index.js';
import Request from 'https://deno.land/x/pogo/lib/request.ts';
import { Status } from 'https://deno.land/std/http/http_status.ts';
import Toolkit from 'https://deno.land/x/pogo/lib/toolkit.ts';

import { basic, serverError } from '../utils/responses.ts';
import bodyParser from '../utils/body-parser.ts';
import { CreateURLData, SerializedRecord } from './types.ts';
import database from '../database/index.ts';
import serializeURLRecord from '../utils/serialize-url-record.ts';
import { URLRecord } from '../database/types.ts';

/**
 * Create a new short URL
 * @param {Request} request - request object
 * @param {Toolkit} tk - response toolkit
 * @returns {Promise<*>}
 */
export default async (request: Request, tk: Toolkit) => {
  try {
    // check the data
    const { secret = '', url = '' }: CreateURLData = await bodyParser(request, ['secret', 'url']);
    if (!(secret && url)) {
      return basic(tk, Status.BadRequest, 'MISSING_DATA');
    }

    // hash the secret
    const hash = await bcrypt.hash(secret);

    // load collection
    const URLRecords = database.collection('URLRecords');

    // create a new record and get back the ID
    const now = `${Date.now()}`;
    const recordId = await URLRecords.insertOne({
      created: now,
      secret: hash,
      short: cuid.slug(),
      url,
      updated: now,
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
