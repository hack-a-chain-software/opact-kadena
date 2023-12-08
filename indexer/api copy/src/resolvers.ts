import { baseRequest } from "./utils";

export const resolvers = {
  Query: {
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
        query += ` WHERE ${conditions.join(' AND ')}`;
      }

      const offset = (args.page - 1) * args.size;

      queryParams.push(args.size, offset);

      query += ` LIMIT $${queryParams.length - 1} OFFSET $${queryParams.length}`;

      const result = await baseRequest(query, queryParams);

      const events = result.rows;

      const hasNextPage = events.length === args.size;

      return {
        events,
        hasNextPage,
        currentPage: args.page,
        itemCount: events.length,
      };
    },

    getCommitments: async (_, args) => {
      const eventName = "new-commitment";

      const offset = (args.page - 1) * args.size;

      const query =
        "SELECT * FROM events WHERE name = $1 AND module = $2 AND chainid = $3 LIMIT $4 OFFSET $5;";

      const result = await baseRequest(query, [
        eventName,
        args.module,
        args.chainId,
        args.size,
        offset,
      ]);

      const events = result.rows.map(({ params }) => {
        const value = params[0]?.int;

        const order = params[1]?.int;

        return {
          order,
          value,
        };
      });

      const hasNextPage = events.length === args.size;

      return {
        events,
        hasNextPage,
        currentPage: args.page,
        itemCount: events.length,
      };
    },

    getNullifiers: async (_, args) => {
      const eventName = "new-nullifier";

      const offset = (args.page - 1) * args.size;

      const query =
        "SELECT * FROM events WHERE name = $1 AND module = $2 AND chainid = $3 LIMIT $4 OFFSET $5;";

      const result = await baseRequest(query, [
        eventName,
        args.module,
        args.chainId,
        args.size,
        offset,
      ]);

      const events = result.rows.map(({ params }) => {
        const nullifier = params[0]?.int;

        return nullifier;
      });

      const hasNextPage = events.length === args.size;

      return {
        events,
        hasNextPage,
        currentPage: args.page,
        itemCount: events.length,
      };
    },

    getReceipts: async (_, args) => {
      const eventName = "new-transaction";

      const offset = (args.page - 1) * args.size;

      const query =
        "SELECT * FROM events WHERE name = $1 AND module = $2 AND chainid = $3 LIMIT $4 OFFSET $5;";

      const result = await baseRequest(query, [
        eventName,
        args.module,
        args.chainId,
        args.size,
        offset,
      ]);

      const events = result.rows.map(({ params }) => {
        const receipt = params[0]?.int;

        return receipt;
      });

      const hasNextPage = events.length === args.size;

      return {
        events,
        hasNextPage,
        currentPage: args.page,
        itemCount: events.length,
      };
    },

    getUtxos: async (_, args) => {
      const eventName = "new-encrypted-output";

      const offset = (args.page - 1) * args.size;

      const query =
        "SELECT * FROM events WHERE name = $1 AND module = $2 AND chainid = $3 LIMIT $4 OFFSET $5;";

      const result = await baseRequest(query, [
        eventName,
        args.module,
        args.chainId,
        args.size,
        offset,
      ]);

      const events = result.rows.map(({ params }) => {
        const utxo = params[0]?.int;

        return utxo;
      });

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
