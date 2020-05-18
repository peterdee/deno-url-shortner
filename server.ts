import pogo from 'https://deno.land/x/pogo/main.ts';

import createURL from './handlers/create-url.ts';
import { port } from './config/index.ts';

const server = pogo.server({ port });

server.route({
  handler: (request: any, response: any) => createURL(request, response),
  method: 'GET',
  path: '/',
});

server.start();
