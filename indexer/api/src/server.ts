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
    params: String!
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
    events: [Event]
    transactions: [Transaction]
  }
`;

const resolvers = {
  Query: {
    events: async () => {
      const client = new Client({
        user: process.env.USER,
        host: process.env.HOST,
        database: 'indexer',
        password: process.env.PASSWORD,
        port: 5432,
      });

      try {
        // Connect to the PostgreSQL server
        await client.connect();

        // Define the SQL query
        const query = 'SELECT * FROM events LIMIT 100;';

        // Execute the query and get the result
        const result = await client.query(query);

        // Return the rows from the result
        return result.rows;
      } catch (err) {
        console.error('An error occurred while fetching the data:', err);
      } finally {
        // Close the connection
        await client.end();
      }
    },
    transactions: async () => {
      const client = new Client({
        user: process.env.USER,
        host: process.env.HOST,
        database: 'indexer',
        password: process.env.PASSWORD,
        port: 5432,
      });

      try {
        // Connect to the PostgreSQL server
        await client.connect();

        // Define the SQL query
        const query = 'SELECT * FROM transactions LIMIT 100;';

        // Execute the query and get the result
        const result = await client.query(query);

        // Return the rows from the result
        return result.rows;
      } catch (err) {
        console.error('An error occurred while fetching the data:', err);
      } finally {
        // Close the connection
        await client.end();
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// This final export is important!

export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  // We will be using the Proxy V2 handler
  handlers.createAPIGatewayProxyEventV2RequestHandler()
);
