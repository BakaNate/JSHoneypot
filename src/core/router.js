/**
 ** Developed by BakaNate
 ** on 10/02/2020
 ** For project JSHoneypot
 ** Copyright (c) 2020. All right reserved.
 */

import express from 'express';
import Ddos from 'ddos';

const PassStorageController = require('../Controllers/PassStorageController');

const router = express.Router();
if (process.env.NODE_ENV === 'PRODUCTION') {
  const ddos = new Ddos({ burst: 5, limit: 10 });
  router.use(ddos.express);
}
router.route('/')
  .get((req, res) => res.status(200).send('Wesh Morray'));

router.route('/pass')
  .get(PassStorageController.getPassStorage);

router.route('/pass/site')
  .get(PassStorageController.decryptPass);

module.exports = router;
