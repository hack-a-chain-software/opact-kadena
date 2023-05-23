Kadena Chainweb Node
=====

The Chainweb Node is a central component in the Chainweb ecosystem. It plays a crucial role in executing and maintaining the operations of the Chainweb blockchain network. In our specific library, the Chainweb Node is configured to connect to a Chainweb Data.

Initialize Database
-------------------

```
docker compose up -d chainweb-initialize-db
docker compose logs chainweb-initialize-db --follow
```

The resulting database is *untrusted*. It is fine for use in testing and
non-critical applications.

The command can be skipped if the database has been initialized already.

Validate Database
-----------------

For production applications it is highly recommended to validate the database
after initialization.

```
docker compose up -d chainweb-validate-db
docker compose logs chainweb-validate-db --follow
```

The second command can take several hours depending on available hardware.
Currently, it takes about 6 hours on a cloud VM with eight CPU cores and eight
GB of RAM. Adding more CPU cores will speed up the process.

NOTE: The chainweb database validation step does not work with testnet.

Run Chainweb Node
-----------------

Prerequisite: an initialized and possibly validated database.

```
docker compose up -d
```

The service API of the node is available on the docker host at port 1848.

Options
-------

By default the node runs in the Kadena mainnet. To run a node in the Kadena
testnet define the `KADENA_NETWORK` variable in an `.env` file:

```
cat >> .env <<EOF
KADENA_NETWORK=testnet04
```

Database synchronization takes less time when the database is synchronized
from a geographically close location, ideally, in the same data center:

```
cat >> .env <<EOF
DB_SYNC_SERVER=IP_ADDRESS_OR_DOMAIN_NAME_OF_OTHER_NODE
```

If you already have a node running to you can make its database available for
remote synchronization as follows:

```
docker compose up -d chainweb-db-rsync
```

By default the P2P port is set to `1789` and the service port is set to `1848`.
To change these ports, define the environment variables `P2P_PORT` and
`SERVICE_PORT` in an `.env` file. The ports must be different values.

```
cat >> .env <<EOF
P2P_PORT=MY_P2P_PORT
SERVICE_PORT=MY_SERVICE_PORT
```
