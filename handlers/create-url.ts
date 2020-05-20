import Request from 'https://deno.land/x/pogo/lib/request.ts';
import { Status } from 'https://deno.land/std/http/http_status.ts';
import Toolkit from 'https://deno.land/x/pogo/lib/toolkit.ts';

import { basic, serverError } from '../utils/responses.ts';
import database from '../database/index.ts';
import { URLRecord } from '../database/types.ts';

export default async (request: Request, tk: Toolkit) => {
  try {
    // load collection
    const URLRecords = database.collection('URLRecords');

    // create a new record and get back the ID
    const now = Date.now();
    const { _id: { $oid: recordId = '' } = {} } = await URLRecords.insertOne({
      created: now,
      secret: 'secret',
      short: 'asd',
      url: 'https://google.com',
      updated: now,
    });

    console.log(recordId)
    // get the record itself
    const record: URLRecord = await URLRecords.findOne({
      _id: {
        "$oid": recordId,
      },
    });

    return basic(tk, Status.OK, 'OK', record);
  } catch (error) {
    return serverError(tk);
  }
};
