const paymentDao = require('../models/paymentDao');

const getMyPoint = async (userId) => {
  const totalPoint = await paymentDao.totalPoints(userId);
  return totalPoint;
};
module.exports = { getMyPoint };
