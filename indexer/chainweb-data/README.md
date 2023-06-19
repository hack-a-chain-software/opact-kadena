## Kadena Chainweb Data

Chainweb Data serves as a data source that provides real-time information about chains, transactions, and other elements of the Chainweb blockchain. By connecting the Chainweb Node to the Chainweb Data, our library allows the node to access real-time data to facilitate its functions, such as transaction execution, block validation, and updating the blockchain state.

### Run
```shell script
$ docker compose up chainweb-data --build -d
```

### Vars
The Chainweb-data container receives all database and node parameters via the .env file. Here are the variables:
```
# Chainweb-data vars
CWD_NODE=""
CWD_DB_PORT=""
CWD_DB_USER=""
CWD_DB_NAME=""
CWD_DB_PASS=""
CWD_DB_HOST=""
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

