import { Client } from "pg";

export const typeDefs = `#graphql
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

  type Query {
    getUtxos(page: Int!, size: Int!, module: String!, chainId: Int!): [Event]
    getReceipts(page: Int!, size: Int!, module: String!, chainId: Int!): [Event]
    getNullifiers(page: Int!, size: Int!, module: String!, chainId: Int!): [Event]
    getCommitments(page: Int!, size: Int!, module: String!, chainId: Int!): [Event]
  }
`;

export const baseRequest = async (query, values) => {
  const client = new Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
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
