/* eslint-disable max-len */
/**
 ** Developed by BakaNate
 ** on 10/02/2020
 ** For project JSHoneypot
 ** Copyright (c) 2020. All right reserved.
 */

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import helmet from 'helmet';
import cors from 'cors';

import BakaLog from '../BakaDevKit/BakaLog';

const morgan = require('morgan');
const PassStorage = require('../Models/PassStorageModel');
const UserAdmin = require('../Models/UserAdminModel');

const router = require('./router');

const port = (process.env.NODE_ENV === 'PRODUCTION') ? 80 : 8080;
const mongooseUri = (process.env.BUILD_ENVIRONMENT === 'PRODUCTION') ? 'mongodb://mongo_hp:27017/hp' : 'mongodb://mongo_hp:27017/hp';
/*const port = (process.env.NODE_ENV === 'production') ? process.env.PORT : 3080;
const mongooseUri = (process.env.NODE_ENV === 'production') ? process.env.MONGOLAB_GRAY_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/honeypot' : 'mongodb://localhost:27017/honeypot-dev';
*/

const Bk = new BakaLog('Bdk:BkRes');

console.time('[*] Booting');

const app = express();

// eslint-disable-next-line no-shadow
function configApp(app) {
  app.use(cors((req, next) => {
    const options = {
      origin: '*',
      optionSuccessStatus: 200,
    };
    next(null, options);
  }));
  app.use(helmet());
  app.use((req, res, next) => { // Overrides some of Helmet's properties
    res.header('Content-Security-Policy', 'default-src \'self\''); // Added layer to prevent from injections (See: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP to write the appropriate policy)
    res.header('X-Frame-Options', 'SAMEORIGIN'); // ClickJacking/ClickBaiting Protection
    res.header('X-XSS-Protection', '1; mode=block'); // XSS Protection (see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection)
    res.header('X-Content-Type-Options', 'nosniff'); // No-Sniffing Content-Type
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH'); // General Allowed Methods
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, x-access-token, Accept'); // Access Control Exhaustive List
    res.header('x-powered-by', 'BakaNate'); // Anti stack disclose
    next();
  });
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(bodyParser.json());
  app.use(passport.initialize());

  app.use(router);
}

function initDb() {
  for (let i = 0; i !== 10; i += 1) {
    PassStorage.createRecord('email@domain.com', `P4ssW0rdOf${i}`, `site/number${i}`, (err, record) => {
      if (err) Bk.boot(`Shit went wrong: ${err}`);
      else Bk.boot(`Created: ${record}`);
    });
  }
  UserAdmin.createRecords('P4ssw0rd*', (err, record) => {
    if (err) console.log(`[BOOT-DEV] Shit went wrong: ${err}`);
    else console.log(`[BOOT-DEV] Created: ${record}`);
    console.log('\n>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<');
  });
}

function initMorgan() {
  morgan.token('body', (req) => JSON.stringify(req.body));
  morgan.token('header', (req) => JSON.stringify(req.headers));

  app.use(morgan('Request:\n'
    + ':date[web] | :method from: :remote-addr to url: :url \n'
    + 'Header: :header\n'
    + 'Body: :body\n'
    + '>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<'));
}

function initMongoConnect() {
  mongoose.Promise = global.Promise;
  console.log(mongooseUri);
  mongoose.connect(mongooseUri, {
    useCreateIndex: true,
    useNewUrlParser: true,
  }).then(() => {
    Bk.boot('Successfully connected to the mongoDB server');
  }).catch((err) => {
    Bk.error(err);
  });
}

initMongoConnect();
initMorgan();
initDb();
configApp(app);

const server = app.listen(port, () => {
  Bk.boot('Honeypot server', 'INF');
  Bk.boot('Written by BakaNate', 'INF');
  Bk.boot('For personal use', 'INF');
  Bk.boot('Before running the app, consider \'npm audit\' && \'snyk test\' to check for any vulnerabilities', 'INF');
  Bk.boot('Moreover, have a look at : https://www.npmjs.com/advisories\n\n', 'INF');
  Bk.boot(`REST API listening at: ${server.address().address}:${server.address().port}`, 'INF');
  Bk.boot(`Mongoose URI: ${mongooseUri}`, 'INF');

  console.timeEnd('[*] Booting');

  process.on('SIGINT', () => {
    Bk.boot('\n\n So long, and thanks for all the fish !\n\r');
    process.exit(0);
  });
});

module.exports = app;
