import { ApolloServer } from "@apollo/server";
import {
  startServerAndCreateLambdaHandler,
  handlers,
} from "@as-integrations/aws-lambda";
import { Client } from "pg";

const typeDefs = `#graphql
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
    getTransactionsByRequestKey(page: Int!, size: Int!, requestKey: String!): [Transaction]
  }
`;

const baseRequest = async (query, values) => {
  const client = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: 'indexer',
    password: process.env.PASSWORD,
    port: 5432,
  });

  try {
    await client.connect();

    const result = await client.query(query, values);

    return result;
  } catch (err) {
    console.error("An error occurred while fetching the data:", err);
  } finally {
    await client.end();
  }
};

const resolvers = {
  Query: {
    getEvents: async (_, args) => {
      const offset = (args.page - 1) * args.size;

      const query = "SELECT * FROM events LIMIT $1 OFFSET $2;";

      const result = await baseRequest(query, [args.size, offset]);

      return result.rows;
    },

    getEventsByModule: async (_, args) => {
      const offset = (args.page - 1) * args.size;

      const query =
        "SELECT * FROM events WHERE module = '$1' LIMIT $2 OFFSET $3;";

      const result = await baseRequest(query, [args.module, args.size, offset]);

      return result.rows;
    },

    getTransactions: async (_, args) => {
      const offset = (args.page - 1) * args.size;

      const query = "SELECT * FROM transactions LIMIT $1 OFFSET $2;";

      const result = await baseRequest(query, [args.size, offset]);

      return result.rows;
    },

    getTransactionsByRequestKey: async (_, args) => {
      const offset = (args.page - 1) * args.size;

      const query = `SELECT * FROM transactions WHERE requestKey = $1 LIMIT $2 OFFSET $3;`;

      const result = await baseRequest(query, [
        args.requestkey,
        args.size,
        offset,
      ]);

      return result.rows;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler()
);
