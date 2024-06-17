import client from "../../client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      const user = await client.user.findFirst({
        where: {
          OR: [{ email: username }, { username: username }],
          //username,
        },
      });
      if (!user) {
        return { ok: false, error: "User not Found." };
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return { ok: false, error: "Incorrect Password." };
      }

      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: "7d",
      });
      return {
        ok: true,
        token,
      };
    },
  },
};
