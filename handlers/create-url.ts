import { Status } from 'https://deno.land/std/http/http_status.ts';

export default (request: any, h: any) => {
  try {
    console.log('req ---------------', request);

    return h.response({
      info: 'OK',
      status: Status.OK,
    }).code(Status.OK);
  } catch (error) {
    console.log('error', error);
    return {
      error,
      info: 'INTERNAL_SERVER_ERROR',
      status: 500,
    }
  }
};
