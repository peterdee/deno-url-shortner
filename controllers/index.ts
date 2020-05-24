import Response from 'https://deno.land/x/pogo/lib/response.ts';
import Toolkit from 'https://deno.land/x/pogo/lib/toolkit.ts';

import { basic } from '../utils/responses.ts';

/**
 * Handle index request
 * @param {Toolkit} tk - response toolkit
 * @returns {Promise<Response>}
 */
export default async (tk: Toolkit): Promise<Response> => basic(tk);
