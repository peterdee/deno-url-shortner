import pogo from 'https://deno.land/x/pogo/main.ts';
import Request from 'https://deno.land/x/pogo/lib/request.ts';
import Server from 'https://deno.land/x/pogo/lib/server.ts';
import Toolkit from 'https://deno.land/x/pogo/lib/toolkit.ts';

import createURL from './handlers/create-url.ts';
import getURL from './handlers/get-url.ts';
import { PORT } from './config/index.ts';

const server: Server = pogo.server({ port: PORT });

server.route({
  handler: (request: Request, tk: Toolkit) => createURL(request, tk),
  method: 'GET', // TODO: set to POST
  path: '/create',
});

server.route({
  handler: (request: Request, tk: Toolkit) => getURL(request, tk),
  method: 'GET',
  path: '/get/:id',
});

console.log(`-- DENO is running on port ${PORT}`);
server.start();
