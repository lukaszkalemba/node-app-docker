const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const redis = require('redis');
const {
  MONGO_USER,
  MONGO_URL,
  MONGO_PASSWORD,
  MONGO_PORT,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require('./config/config');
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}:${MONGO_PORT}/?authSource=admin`;

let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient({
  host: REDIS_URL,
  post: REDIS_PORT,
});

const connectWithRetry = () => {
  mongoose
    .connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Successfully connected to mongodb'))
    .catch((e) => {
      console.log(e);

      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 30000, // 30 seconds
    },
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server running');
});

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
