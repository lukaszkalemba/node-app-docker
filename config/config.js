module.exports = {
  MONGO_URL: process.env.MONGO_URL || 'mongo',
  // 'mongo' is a name of mongodb service defined in docker-compose file
  MONGO_PORT: process.env.MONGO_PORT || 27017,
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  REDIS_URL: process.env.REDIS_URL || 'redis',
  // 'redis' is a name of redis service defined in docker-compose file
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  SESSION_SECRET: process.env.SESSION_SECRET,
};
