import { baseRequest } from "./utils";

export const resolvers = {
  Query: {
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

      return result.rows;
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

      return result.rows;
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

      return result.rows;
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

      return result.rows;
    },
  },
};
