import pogo from 'https://deno.land/x/pogo/main.ts';
import Request from 'https://deno.land/x/pogo/lib/request.ts';
import Response from 'https://deno.land/x/pogo/lib/response.ts';
import Server from 'https://deno.land/x/pogo/lib/server.ts';
import Toolkit from 'https://deno.land/x/pogo/lib/toolkit.ts';

import createURL from './controllers/create-url.ts';
import deleteURL from './controllers/delete-url.ts';
import index from './controllers/index.ts';
import { PORT as port } from './config/index.ts';
import redirectToURL from './controllers/redirect-to-url.ts';

const server: Server = pogo.server({ port });

server.route({
  handler: (_: Request, tk: Toolkit): Promise<Response> => index(tk),
  method: 'GET',
  path: '/',
});

server.route({
  handler: (request: Request, tk: Toolkit): Promise<Response> => createURL(request, tk),
  method: 'POST',
  path: '/create',
});

server.route({
  handler: (request: Request, tk: Toolkit): Promise<Response> => deleteURL(request, tk),
  method: 'DELETE',
  path: '/delete/{id}',
});

server.route({
  handler: (request: Request, tk: Toolkit): Promise<Response> => redirectToURL(request, tk),
  method: 'GET',
  path: '/go/{id}',
});

console.log(`-- DENO is running on port ${port}`);
server.start();
