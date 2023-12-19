import { baseRequest } from "./utils";

export const resolvers = {
  Query: {
    getCommitments: async (_, args) => {
      const offset = (args.page - 1) * args.size;

      const query =
        "SELECT * FROM events WHERE name = $1 AND module = $2 AND chainid = $3 LIMIT $4 OFFSET $5";

      const result = await baseRequest(query, [
        'new-commitment',
        args.module,
        args.chainId,
        args.size,
        offset,
      ]);

      const events =
        result?.rows.map(({ params }) => {
          console.log('params', params)
          const value = params[0]?.int;

          const order = params[1]?.int;

          return {
            order,
            value,
          };
        }) || [];

      const hasNextPage = events?.length === args.size;

      return {
        events,
        hasNextPage,
        currentPage: args.page,
        itemCount: events.length,
      };
    },

    getNullifiers: async (_, args) => {
      const offset = (args.page - 1) * args.size;

      const query =
        "SELECT * FROM events WHERE name = new-nullifier AND module = $1 AND chainid = $2 LIMIT $3 OFFSET $4";

      const result = await baseRequest(query, [
        args.module,
        args.chainId,
        args.size,
        offset,
      ]);

      const events = result?.rows.map(({ params }) => params[0]?.int) || [];

      const hasNextPage = events.length === args.size;

      return {
        events,
        hasNextPage,
        currentPage: args.page,
        itemCount: events.length,
      };
    },

    getReceipts: async (_, args) => {
      const offset = (args.page - 1) * args.size;

      const query =
        "SELECT * FROM events WHERE name = new-transaction AND module = $1 AND chainid = $2 LIMIT $3 OFFSET $4";

      const result = await baseRequest(query, [
        args.module,
        args.chainId,
        args.size,
        offset,
      ]);

      const events = result?.rows.map(({ params }) => params[0]?.int) || [];

      const hasNextPage = events.length === args.size;

      return {
        events,
        hasNextPage,
        currentPage: args.page,
        itemCount: events.length,
      };
    },

    getUtxos: async (_, args) => {
      const offset = (args.page - 1) * args.size;

      const query = "SELECT * FROM events WHERE name = new-encrypted-output AND module = $1 AND chainid = $2 LIMIT $3 OFFSET $4";

      const result = await baseRequest(query, [
        args.module,
        args.chainId,
        args.size,
        offset,
      ]);

      const events = result?.rows.map(({ params }) => params[0]?.int) || [];

      const hasNextPage = events.length === args.size;

      return {
        events,
        hasNextPage,
        currentPage: args.page,
        itemCount: events.length,
      };
    },
  },
};
