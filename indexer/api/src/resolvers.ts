import { baseRequest } from "./utils";

export const resolvers = {
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
        "SELECT * FROM events WHERE module = $1 LIMIT $2 OFFSET $3;";

      const result = await baseRequest(query, [args.module, args.size, offset]);

      return result.rows;
    },

    getTransactions: async (_, args) => {
      const offset = (args.page - 1) * args.size;

      const query = "SELECT * FROM transactions LIMIT $1 OFFSET $2;";

      const result = await baseRequest(query, [args.size, offset]);

      return result.rows;
    },
  },
};
