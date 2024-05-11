import client from "../client.js";

export default {
  Query: {
    movies: () => client.movie.findMany(),
    movie: () => client.movie.findUnique({ where: { id } }),
  },
};
