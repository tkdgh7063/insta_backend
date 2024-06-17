import client from "../../client.js";
import { protectedResolver } from "../users.utils.js";

export default {
  Query: {
    own: protectedResolver((_1, _2, { loggedInUser }) =>
      client.user.findUnique({ where: { id: loggedInUser.id } })
    ),
  },
};
