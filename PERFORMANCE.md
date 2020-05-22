## Performance

Tested with [`wrk`](https://github.com/wg/wrk).

Tests performed on a MBP (15", 2018, 6-core, i7, 2.2Ghz, 16GB).

Since Deno is single-threaded, the server is using only a single core.

#### Case 1: not querying the database

```text
peter: ~/Scripts $ wrk -c 100 -d 30 -t 4 http://localhost:1122/go/12345
Running 30s test @ http://localhost:1122/go/12345
  4 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     5.79ms    7.87ms 297.66ms   98.84%
    Req/Sec     4.70k   372.86     5.01k    89.42%
  561760 requests in 30.06s, 73.40MB read
Requests/sec:  18686.23
Transfer/sec:      2.44MB
```

#### Case 2: querying the database

```text
peter: ~/Scripts $ wrk -c 100 -d 30 -t 4 http://localhost:1122/go/6z017mu
Running 30s test @ http://localhost:1122/go/6z017mu
  4 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     6.12ms    9.41ms 313.99ms   98.68%
    Req/Sec     4.60k   453.80     4.95k    92.92%
  550897 requests in 30.06s, 71.98MB read
Requests/sec:  18324.17
Transfer/sec:      2.39MB
```

The database is hosted separately. 

There's no significant performance drop when database is being used.
