import pogo from 'https://deno.land/x/pogo/main.ts';
import Request from 'https://deno.land/x/pogo/lib/request.ts';
import Server from 'https://deno.land/x/pogo/lib/server.ts';
import Toolkit from 'https://deno.land/x/pogo/lib/toolkit.ts';

import createURL from './controllers/create-url.ts';
import { PORT } from './config/index.ts';
import redirectToURL from './controllers/redirect-to-url.ts';

const server: Server = pogo.server({ port: PORT });

server.route({
  handler: (request: Request, tk: Toolkit) => createURL(request, tk),
  method: 'POST',
  path: '/create',
});

server.route({
  handler: (request: Request, tk: Toolkit) => redirectToURL(request, tk),
  method: 'GET',
  path: '/go/{id}',
});

console.log(`-- DENO is running on port ${PORT}`);
server.start();
