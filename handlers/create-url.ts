import Request from 'https://deno.land/x/pogo/lib/request.ts';
import { Status } from 'https://deno.land/std/http/http_status.ts';
import Toolkit from 'https://deno.land/x/pogo/lib/toolkit.ts';

import { basic } from '../utils/responses.ts';

export default (request: Request, tk: Toolkit) => {
  try {

    return basic(tk, Status.OK, 'OK');
  } catch (error) {
    return error(tk, Status.OK, 'OK');
    return {
      error,
      info: 'INTERNAL_SERVER_ERROR',
      status: 500,
    }
  }
};
