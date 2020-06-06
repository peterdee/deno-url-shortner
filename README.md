## deno-url-shortner

A simple URL shorting service with Deno, Mongo and Pogo.

Stack: [`Deno`](https://deno.land), [`MongoDB`](https://www.mongodb.com/), [`Pogo`](https://github.com/sholladay/pogo).

See the project in action: https://vue-url-shortner.herokuapp.com

Frontend repository: https://github.com/peterdee/vue-url-shortner

DEV: http://localhost:1122

STAGE: https://deno-url-shortner.herokuapp.com

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

### Heroku

The `stage` branch is deployed to Heroku automatically.

Check [this](https://github.com/chibat/heroku-deno-getting-started) for more details regarding the Heroku deployment.

### Available APIs

See the [APIS.md](APIS.md) for more information.

### Performance

See the [PERFORMANCE.md](PERFORMANCE.md) for more information.
