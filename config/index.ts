export const environemt = Deno.env.toObject();

// Application port
export const port = Number(environemt.PORT) || 1122;
