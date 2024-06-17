import client from "../../client.js";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (_, { email, name, username, password }) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [{ email }, { username }],
          },
        });
        if (existingUser) {
          // throw new Error("This Email/Username is already in use.");
          return {
            ok: false,
            error: "This Email/Username is already in use.",
          };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await client.user.create({
          data: {
            email,
            name,
            username,
            password: hashedPassword,
          },
        });

        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: "Error occured while creating account",
        };
      }
    },
  },
};
