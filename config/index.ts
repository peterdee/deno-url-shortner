import 'https://deno.land/x/denv/mod.ts';

export const environemt = Deno.env.toObject();

// CORS
export const CORS_ENABLED = environemt.CORS_ENABLED === 'true';

// Database connection
export const DATABASE = {
  host: environemt.DB_HOST || 'localhost',
  name: environemt.DB_NAME || '',
  password: environemt.DB_PASSWORD || '',
  port: Number(environemt.DB_PORT) || 27017,
  username: environemt.DB_USERNAME || '',
};

// Application ENV
export const { ENV = 'dev' } = environemt;

// Application port
export const PORT = Number(environemt.PORT) || 1122;

// Backend URI
export const BACKEND_URI = environemt.BACKEND_URI || `http://localhost:${PORT}`;
