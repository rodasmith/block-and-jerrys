const router = require('express').Router();
const bp = require('body-parser');

const {
  Order,
  Donut,
  DonutOrder,
} = require('./postgres');
const getDistance = require('./getDistance');

router.use(bp.json());
router.use(bp.urlencoded({ extended: false }));

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.use('/dashboard/order/:orderId', async (req, res) => {
  const data = await DonutOrder.findAll({
    where: {
      order_id: req.params.orderId,
    },
    include: [{ model: Donut }],
  });
  res.json({ data });
});

router.use('/dashboard', async (req, res) => {
  if (req.body.baseball === process.env.BASEBALL) {
    const data = await Order.findAll({
    });
    res.json({ success: true, data });
  } else {
    res.json({ success: false });
    // ping us that there was an incorrect password attempt
    // log and save request data
  }
});

module.exports = router;
