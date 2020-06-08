import pogo from 'https://deno.land/x/pogo/main.ts';
import Request from 'https://deno.land/x/pogo/lib/request.ts';
import Response from 'https://deno.land/x/pogo/lib/response.ts';
import Server from 'https://deno.land/x/pogo/lib/server.ts';
import Toolkit from 'https://deno.land/x/pogo/lib/toolkit.ts';

import createURL from './controllers/create-url.ts';
import deleteURL from './controllers/delete-url.ts';
import { ENV, PORT as port } from './config/index.ts';
import getURL from './controllers/get-url.ts';
import index from './controllers/index.ts';
import redirectToURL from './controllers/redirect-to-url.ts';
import { ServerOptions } from './utils/types.ts';

// server options
const options: ServerOptions = {
  port,
};
if (ENV === 'heroku') {
  options.hostname = '0.0.0.0';
}

const server: Server = pogo.server(options);

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
  path: '/delete/{short}',
});

server.route({
  handler: (request: Request, tk: Toolkit): Promise<Response> => getURL(request, tk),
  method: 'GET',
  path: '/get/{id}',
});

server.route({
  handler: (request: Request, tk: Toolkit): Promise<Response> => redirectToURL(request, tk),
  method: 'GET',
  path: '/go/{id}',
});

console.log(`-- DENO is running on port ${port} [${ENV.toUpperCase()}]`);
server.start();
