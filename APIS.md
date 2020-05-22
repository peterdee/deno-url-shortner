## Available APIs

### `/create [POST]`

This API creates a new short URL for the original URL address.

Request body:

```json
"data": {
  "secret": "secret phrase",
  "url": "original url"
}
```

Secret phrase - a secret, that can be used to update or delete the database record by its author (*these APIs are not impelemnted yet*).

URL - an original URL, that should be 'shortened'.

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

### `/go/{id} [GET]`

Redirects to the original URL.

You will get the `404` error if the `id` parameter is missing, invalid or not found.
