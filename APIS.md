## Available APIs

### `/ [GET]`

Ping the server.

Response:

```json
{
  "datetime": 1590335943357,
  "info": "OK",
  "status": 200
}
```

### `/create [POST]`

This API creates a new short URL for the original URL address.

Request body:

```json
"data": {
  "secret": "secret phrase",
  "url": "original url"
}
```

`secret` - a secret phrase, that can be used to delete the database record by its creator.

`url` - an original URL address, that should be 'shortened'.

Since both of these fields are required, you will get the `400` error if any of them is missing.

Response:

```json
{
  "datetime": 1590149845806,
  "info": "OK",
  "status": 200,
  "data": {
    "id": "5ec7c2d50079fdac004c96fe",
    "link": "http://localhost:1122/go/6z017mu",
    "url": "https://google.com",
    "updated": "1590149845259"
  }
}
```

Opening the `link` from the response should redirect you to the original URL.

### `/delete/{id} [DELETE]`

Delete the 'shortened' URL.

`id` - the 'short' identifier.

Request body:

```json
"data": {
  "secret": "secret phrase"
}
```

`secret` - a secret phrase, that was provided during the creation.

You will get the `400` error if `sercet` is missing.

You will get the `404` error if `id` is invalid or missing.

You will get the `401` error if `secret` is invalid.

Response:

```json
{
  "datetime": 1590336611762,
  "info": "OK",
  "status": 200
}
```

### `/get/{id} [GET]`

Get the 'shortened' URL.

`id` - the 'short' identifier.

Response:

```json
{
  "datetime": 1590337314426,
  "info": "OK",
  "status": 200,
  "data": {
      "id": "5eca9f01007ef7e40017692d",
      "link": "http://localhost:1122/go/zj1e73j",
      "url": "https://github.com/peterdee",
      "updated": "1590337281583"
  }
}
```

You will get the `404` error if `id` is invalid or missing.

### `/go/{id} [GET]`

Redirects to the original URL.

You will be redirected to the frontend page if `id` was not found.
