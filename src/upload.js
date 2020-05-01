import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_PRIVATE_ACCESS_KEY,
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "stargram2020",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
}); 

//multer가 중간에 이름이 file인 파일 가로채서 S3에 업로드하고, file object제공
export const uploadMiddleware = upload.single("file");

export const uploadController = (req, res) => {
    const { file : {location} } = req;
    res.json({ location });
};