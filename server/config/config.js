require('dotenv').config();

module.exports = {
  development: {
    username: process.env.LOCAL_USER,
    password: process.env.LOCAL_PASSWORD,
    database: process.env.LOCAL_NAME,
    host: process.env.LOCAL_HOST,
    port: process.env.LOCAL_PORT,
  },
  test: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
  },
  production: {
    username: process.env.RDS_USER,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_NAME,
    host: process.env.RDS_HOST,
    port: process.env.RDS_PORT,
  },
};
