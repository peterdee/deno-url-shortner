## deno-url-shortner

A simple URL shorting service with Deno, Mongo and Pogo.

Stack: [`Deno`](https://deno.land), [`MongoDB`](https://www.mongodb.com/), [`Pogo`](https://github.com/sholladay/pogo).

By default, the server uses the `1122` port.

### Deploy

```shell script
git clone https://github.com/peterdee/deno-url-shortner
cd ./deno-url-shortner
```

### Environment

The `.env` file is required!

See the [`.env.example`](.env.example) for more information about the required environment variables.

### Launch

For development, run the following:

```shell script
bash start.sh
```

### Available APIs

See the [APIS.md](APIS.md) for more information.

### Performance

See the [PERFORMANCE.md](PERFORMANCE.md) for more information.
