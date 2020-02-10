import express from 'express';
import Ddos from 'ddos';

const router = express.Router();
if (process.env.NODE_ENV === 'PRODUCTION') {
  const ddos = new Ddos({ burst: 5, limit: 10 });
  router.use(ddos.express);
}
router.route('/')
  .get((req, res) => res.status(200).send('Wesh Morray'));

module.exports = router;
