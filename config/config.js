const {
  DB_USERNAME: username,
  DB_PASSWORD: password,
  DB_NAME: database,
  DB_HOST: host,
  DB_PORT: port,
  NODE_ENV,
  SEQUELIZE_LOGGING,
} = process.env;

const config = {
  username,
  password,
  database,
  host,
  port,
  dialect: 'postgres',
  logging: (SEQUELIZE_LOGGING != null ? JSON.parse(SEQUELIZE_LOGGING) : NODE_ENV !== 'production') && console.log,
};

module.exports = {
  development: config,
  test: config,
  production: config,
};
