require('dotenv').config()

module.exports = {
    DB: process.env.APP_DB,
    PORT: process.env.APP_PORT,
    SECRET_KEY: process.env.APP_SECRET_KEY,
    ENCRYPT_SECRET : process.env.APP_ENCRYPT_SECRET_KEY,
    // s3
    BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    BUCKET_REGION: process.env.AWS_BUCKET_REGION,
    ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    SECRET_KEY: process.env.AWS_SECRET_KEY,
    //dialogflow
    PROJECT_ID: process.env.PROJECT_ID,
    PRIVATE_KEY_ID: process.env.PRIVATE_KEY_ID,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    CLIENT_EMAIL: process.env.CLIENT_EMAIL
}