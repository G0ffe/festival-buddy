const express = require('express');
const mongoose = require('mongoose');

const { PORT, DATABASE_URL } = require('./server/config');

const middleware = require('./server/config/express.middleware');
const routes = require('./server/config/routes');

const app = express();

middleware(app);
routes(app);

let server;

function runServer(database_url = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(database_url, err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.server(err));
}

module.exports = { app, runServer, closeServer };
