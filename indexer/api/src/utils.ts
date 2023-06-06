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

export const baseRequest = async (query, values) => {
  const client = new Client({
    user: "doadmin",
    host: "chainweb-database.cy3zz0ima9l1.us-east-1.rds.amazonaws.com",
    database: "indexer",
    password: "5FHSFSip",
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