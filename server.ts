import pogo from 'https://deno.land/x/pogo/main.ts';
import Request from 'https://deno.land/x/pogo/lib/request.ts';
import Server from 'https://deno.land/x/pogo/lib/server.ts';
import Toolkit from 'https://deno.land/x/pogo/lib/toolkit.ts';

import createURL from './controllers/create-url.ts';
import getURL from './controllers/get-url.ts';
import { PORT } from './config/index.ts';

const server: Server = pogo.server({ port: PORT });

server.route({
  handler: (request: Request, tk: Toolkit) => createURL(request, tk),
  method: 'POST',
  path: '/api/create',
});

server.route({
  handler: (request: Request, tk: Toolkit) => getURL(request, tk),
  method: 'GET',
  path: '/api/get/:id',
});

console.log(`-- DENO is running on port ${PORT}`);
server.start();
