## Kadena chainweb-data for kadena node

### Run
```shell script
$ docker compose up chainweb-data --build -d

```
### Chainweb-data complex solution
- server 
- fill

```shell script
Node info: service-port=31351 --p2p-port=31350
```

### Health check
```shell script
docker inspect --format "{{json .State.Health }}" KadenaChainWebData | jq
```

### Endpoints
- /txs/recent gets a list of recent transactions
- /txs/search?search=foo&limit=20&offset=40 searches for transactions containing the string foo
- /stats returns a few stats such as transaction count and coins in circulation
- /coins returns just the coins in circulation

# Database

This package contains the migrations needed in order to initialize the application's database, as well as seed it with development data.

## Container Image

This repository contains a `Dockerfile` which generates a Postgres image. Currently there are no modifications to the base `postgres:14.5-bullseye` image, except for labeling. However, the `docker-compose.yml` at the repository's root, mounts a volume with commited migrations to `/docker-entrypoint-initdb.d`, which ensures the database is up to date with them.

> Note: seeding does not happen automatically, as it's a development-only procedure and we're currently sharing the image with production and development. As that'll hardly matter - the production database does not get redeployed after all -, it's reasonable to consider if we should only use the image for development. In either case the use of a custom image itself may be a mistake, as we could just mount volumes to the base image instead.

> TODO: document `graphile-migrate` user and databases requirements (e.g. the shadow database), as they're applicable to production as well.

## Migrations

The migrations are managed by the `graphile-migrate` tool. Refer to the [project's documentation](https://github.com/graphile/migrate) for more information.

We version the migrations at the `migrations` folder, which contains two subfolders: `current` & `committed`. The `commited` folder contains previous migrations which were already committed to the production database, while the `current` folder contains the current iteration of migrations, to be numbered according to the order they are supposed to run, with optional leading zeroes and an optional dash-separated name (e.g. `0001-whatever.sql`). We strongly recommend naming the migration before commiting it (instead of commiting with the default `1-current.sql` name).

*It's fundamental to keep migrations idempotent.*
