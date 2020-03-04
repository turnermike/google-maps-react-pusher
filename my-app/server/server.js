// server/server.js

const express = require('express')
const bodyParser = require('body-parser')
const Pusher = require('pusher');

// create a express application
const app = express();

// initialize pusher
// let pusher = new Pusher({
//     appId: 'PUSHER_APP_ID',
//     key: 'PUSHER_APP_KEY',
//     secret: 'PUSHER_APP_SECRET',
//     cluster: 'PUSHER_APP_CLUSTER',
//     encrypted: true
// });
let pusher = new Pusher({
  appId: '957735',
  key: '138613f6c714ecb1d231',
  secret: '4ef4f1d9815317c0faed',
  cluster: 'us2',
  encrypted: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// to Allow CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});