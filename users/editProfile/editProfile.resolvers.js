import bcrypt from "bcrypt";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import { createWriteStream, ReadStream } from "fs";
import client from "../../client.js";
import { protectedResolver } from "../users.utils.js";
import { uploadAWS } from "../../common/common.utils.js";
// import { finished } from "stream/promises";

const editResolver = async (
  _,
  { email, name, username, password: newPassword, bio, avatar },
  { loggedInUser }
) => {
  let avatarUrl = null;
  if (avatar) {
    avatarUrl = await uploadAWS(loggedInUser.id, "avatars", avatar);
    /* code for file local save */
    // const { filename, createReadStream } = await avatar;
    // const newFilename = `${loggedInUser.id}_${Date.now()}_${filename}`;
    // const readStream = createReadStream();
    // const writeStream = createWriteStream(
    //   process.cwd() + "/uploads/" + newFilename
    // );
    // readStream.pipe(writeStream);
    // avatarUrl = `http://localhost:4000/static/${newFilename}`;
  }

  let hashedPassword = null;
  if (newPassword) {
    hashedPassword = await bcrypt.hash(newPassword, 10);
  }

  const res = await client.user.update({
    where: { id: loggedInUser.id },
    data: {
      email,
      name,
      username,
      bio,
      avatar,
      ...(hashedPassword && { password: hashedPassword }),
      ...(avatarUrl && { avatar: avatarUrl }),
    },
  });
  if (res) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Edit Profile Error",
    };
  }
};

export default {
  Upload: GraphQLUpload,
  Mutation: {
    editProfile: protectedResolver(editResolver),
    // singleUpload: async (parent, { file }) => {
    //   const { createReadStream, filename, mimetype, encoding } = await file;

    //   // Invoking the `createReadStream` will return a Readable Stream.
    //   // See https://nodejs.org/api/stream.html#stream_readable_streams
    //   const stream = createReadStream();

    //   // This is purely for demonstration purposes and will overwrite the
    //   // local-file-output.txt in the current working directory on EACH upload.
    //   const out = require("fs").createWriteStream("local-file-output.txt");
    //   stream.pipe(out);
    //   await finished(out);

    //   return { filename, mimetype, encoding };
    // },
  },
};
