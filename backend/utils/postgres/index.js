const {
  Sequelize,
  Op,
} = require('sequelize');

const db = new Sequelize(process.env.POSTGRES_URI, {
  dialect: 'postgres',
  operatorsAliases: false,
  logging: false,
});

db.authenticate()
  .then(() => console.log(`\nConnected to "${process.env.POSTGRES_URI}".`))
  .catch((error) => {
    console.log(`\nUnable to connect to database: ${error}`);
    process.exit(1);
  });

const Order = db.import('./order.js');
const Donut = db.import('./donut.js');
const DonutOrder = db.import('./donut_order.js');

Order.hasMany(DonutOrder);
Donut.hasMany(DonutOrder);
DonutOrder.belongsTo(Order);
DonutOrder.belongsTo(Donut);

DonutOrder.donutCount = async () => {
  const orders = await DonutOrder.findAll({
    include: [{
      model: Order,
      where: { status: 'paid' },
    }],
  });
  const donutCount = orders.reduce((sum, x) => x.quantity + sum, 0);
  return donutCount;
};

Donut.cart = async () => {
  const cart = await Donut.findAll({
    order: [
      ['id', 'ASC'],
    ],
  });
  return cart;
};

module.exports = {
  db,
  Op,
  Order,
  Donut,
  DonutOrder,
};
