import Request from 'https://deno.land/x/pogo/lib/request.ts';
import { Status } from 'https://deno.land/std/http/http_status.ts';
import Toolkit from 'https://deno.land/x/pogo/lib/toolkit.ts';

import { basic, serverError } from '../utils/responses.ts';
import database from '../database/index.ts';
import { URLRecord } from '../database/types.ts';

export default async (request: Request, tk: Toolkit) => {
  try {

    const decoder = new TextDecoder();
    const buffer = new Uint8Array(20);
    const numBytesRead = await request.body.read(buffer) || 0;
    const bodyText = decoder.decode(buffer.subarray(0, numBytesRead));
    console.log(bodyText);

    // load collection
    const URLRecords = database.collection('URLRecords');

    // create a new record and get back the ID
    const now = `${Date.now()}`;
    const recordId = await URLRecords.insertOne({
      created: now,
      secret: 'secret',
      short: 'asd',
      url: 'https://google.com',
      updated: now,
    });

    // get the record itself
    const record: URLRecord = await URLRecords.findOne({
      _id: {
        '$oid': recordId['$oid'],
      },
    });

    return basic(tk, Status.OK, 'OK', record);
  } catch (error) {
    return serverError(tk);
  }
};
