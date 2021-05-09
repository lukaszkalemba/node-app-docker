const express = require('express');
const mongoose = require('mongoose');
const {
  MONGO_USER,
  MONGO_IP,
  MONGO_PASSWORD,
  MONGO_PORT,
} = require('./config/config');

const app = express();

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

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

app.get('/', (req, res) => {
  res.send('Server running');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
