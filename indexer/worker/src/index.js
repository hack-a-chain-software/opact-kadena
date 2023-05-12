const { ApolloServer, gql } = require('apollo-server');
const { Pool } = require('pg');

// Define your GraphQL schema
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Define your resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
  },
};

// Connect to your PostgreSQL database
const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'indexer',
    password: 'abacaba',
    port: "5432",
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ pool, req }),
});

exports.handler = server.createHandler({
  path: '/api/graphql',
});
