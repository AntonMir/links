const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  [process.env.NODE_ENV]: {
    dialect: process.env.DATABASE__DIALECT,
    host: process.env.DATABASE__HOST,
    port: process.env.DATABASE__PORT,
    logging: process.env.NODE_ENV !== 'production',
    username: process.env.DATABASE__USERNAME,
    password: process.env.DATABASE__PASSWORD,
    database: process.env.DATABASE__DATABASE,
    dialectOptions: {
      application_name: process.env.DATABASE__APPLICATION_NAME,
      ssl: {
        rejectUnauthorized: true,
      },
    },
    migrationStorage: 'sequelize',
    seederStorage: 'sequelize',
  },
};
