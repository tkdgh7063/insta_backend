import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

export const uploadAWS = async (id, folder, file) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: "insta-35c42",
      Key: `${folder}/${id}_${Date.now()}_${filename}`,
      ACL: "public-read",
      Body: readStream,
    })
    .promise();
  //   console.log(uploadRes);
  return Location;
};
