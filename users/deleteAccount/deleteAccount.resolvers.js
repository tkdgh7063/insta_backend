import client from "../../client.js";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    deleteAccount: async (_, { email, username, password }) => {
      try {
        const existing = await client.user.findUnique({
          where: {
            OR: [{ email }, { username }],
          },
        });

        if (!existing) {
          return {
            ok: false,
            error: "User not Found.",
          };
        }

        const passwordMatch = await bcrypt.compare(password, existing.password);

        if (passwordMatch) {
          await client.user.delete({
            where: { OR: [{ email }, { username }] },
          });
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Wrong Password.",
          };
        }
      } catch (e) {
        throw e;
      }
    },
  },
};
