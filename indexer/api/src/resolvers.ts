import { baseRequest } from "./utils";

export const resolvers = {
  Query: {
    getCommitments: async (_, args) => {
      const offset = (args.page - 1) * args.size;

      const query =
        "SELECT * FROM events WHERE name = new-commitment AND module = $1 AND chainid = $2 LIMIT $3 OFFSET $4";

      const result = await baseRequest(query, [
        args.module,
        args.chainId,
        args.size,
        offset,
      ]);

      const events =
        result?.rows.map(({ params }) => {
          const value = params[0]?.int;

          const order = params[1]?.int;

          return {
            order,
            value,
          };
        }) || [];

      const hasNextPage = events.length === args.size;

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

    getEvents: async (_, args) => {
      let query = "SELECT * FROM events";

      const queryParams = [];
      const conditions = [];

      if (args.module) {
        queryParams.push(args.module);

        conditions.push(`module = $${queryParams.length}`);
      }

      if (args.chainId) {
        queryParams.push(args.chainId);

        conditions.push(`chainid = $${queryParams.length}`);
      }

      if (args.name) {
        queryParams.push(args.name);

        conditions.push(`name = $${queryParams.length}`);
      }

      if (args.block) {
        queryParams.push(args.block);

        conditions.push(`block = $${queryParams.length}`);
      }

      if (args.requestkey) {
        queryParams.push(args.requestkey);

        conditions.push(`requestkey = $${queryParams.length}`);
      }

      if (conditions.length > 0) {
        query += ` WHERE ${conditions.join(" AND ")}`;
      }

      const offset = (args.page - 1) * args.size;

      queryParams.push(args.size, offset);

      query += ` LIMIT $${queryParams.length - 1} OFFSET $${
        queryParams.length
      }`;

      const result = await baseRequest(query, queryParams);

      const events = result.rows || [];

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
