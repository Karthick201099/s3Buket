const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const config = require('../config')

const s3 = new S3Client({
  region: config.BUCKET_REGION,
  credentials: {
    accessKeyId: config.ACCESS_KEY,
    secretAccessKey: config.SECRET_KEY
  }
})
// console.log(config.BUCKET_REGION, config.ACCESS_KEY, config.SECRET_KEY, config.BUCKET_NAME)
const uploadFile = async (fileContent, key, contentType) => {
  const params = {
    Bucket: config.BUCKET_NAME,
    Key: key,
    Body: fileContent,
    ContentType: contentType
  }

  try {
    const command = new PutObjectCommand(params)
    const data = await s3.send(command)
    return data
  } catch (err) {
    console.error('Error uploading file:', err.message)
    throw new Error('Error uploading file:' + err.message)
  }
}

module.exports = uploadFile
