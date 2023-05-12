# Indexer

In order to be able to make an Indexer in Kadena, it is necessary to have some services running, they are: A postgresql database, a chainweb-node, a chainweb-data and a worker that exposes the database as a graphql API.

These services have to work in harmony, where chainweb-node is responsible for receiving events from the blockchain, chainweb-data connects to the node to fetch all events and save them in a postgresql database

## How to run

Esse package contem tudo que é necessário para que você consiga rodar localmente um chainweb-data, um chainweb-node (não recomendável) e um banco postgresql.

Follow the tutorials on how to run a chainweb-data and its database here:[Chainweb-data](./docs/chainweb-data.md)

If necessary, follow the tutorials on how to run a [chainweb-node](./docs/chainweb-node.md)
