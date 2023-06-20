# Indexer API

This is a GraphQL backend boilerplate in Node.js that can be deployed on AWS Lambda. This backend API is primarily used to index and query blockchain events and transactions.

## Stack
- Node.js 14.x
- AWS RDS Postgres
- AWS Lambda

## Frameworks/Libraries
- pg
- graphql
- Apollo Server
- @as-integrations/aws-lambda

## Schema

The schema includes Event and Transaction types that represent blockchain events and transactions respectively. We have queries to fetch these events and transactions.

```
type Event {
  block: String!
  chainid: Int!
  height: Int!
  idx: Int!
  module: String!
  modulehash: String!
  name: String!
  paramtext: String!
  qualname: String!
  requestkey: String!
}

type Transaction {
  badresult: String
  block: String!
  chainid: Int!
  code: String
  continuation: String
  creationtime: String!
  data: String
  gas: Int!
  gaslimit: Int!
  gasprice: Float!
  goodresult: String
  height: Int!
  logs: String
  metadata: String
  nonce: String!
  num_events: Int
  pactid: String
  proof: String
  requestkey: String!
  rollback: Boolean
  sender: String!
  step: Int
  ttl: Int!
  txid: Int
}

type Query {
  getEvents(page: Int!, size: Int!): [Event]
  getEventsByModule(page: Int!, size: Int!, module: String!): [Event]
  getTransactions(page: Int!, size: Int!): [Transaction]
}
```

## Development
This project is organized as a monorepo and uses the Serverless Framework for development and deployment. Here are the steps to set up and run the function locally:

Set your environment variables for connecting to the Postgres instance on RDS. These environment variables include *PG_USER*, *PG_HOST*, *PG_DATABASE*, *PG_PASSWORD*, and *PG_PORT*. You can use a .env file to manage these environment variables.

Navigate to the root directory of the monorepo, then use the command pnpm indexer api followed by the serverless command you wish to run. For example, if you want to invoke the function locally, you would use:

```bash
Copy code
$ pnpm indexer api serverless invoke local --function myFunction
```

Replace myFunction with the name of the function you wish to invoke.

## Deployment
This project uses Terraform for infrastructure management. Terraform handles the deployment of the AWS Lambda function and has mechanisms in place for updating the code as necessary.
