import { Client } from "pg";

export const typeDefs = `#graphql
  scalar JSON

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

  type PaginatedEvents {
    events: [JSON]
    itemCount: Int
    currentPage: Int
    hasNextPage: Boolean
  }

  type Query {
    getUtxos(page: Int!, size: Int!, module: String!, chainId: Int!): PaginatedEvents
    getReceipts(page: Int!, size: Int!, module: String!, chainId: Int!): PaginatedEvents
    getNullifiers(page: Int!, size: Int!, module: String!, chainId: Int!): PaginatedEvents
    getCommitments(page: Int!, size: Int!, module: String!, chainId: Int!): PaginatedEvents
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
