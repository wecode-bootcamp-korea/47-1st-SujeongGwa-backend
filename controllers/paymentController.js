const { paymentService } = require('../services');

const mypoint = async function (req, res) {
  try {
    const userId = 32;
    const result = await paymentService.getMyPoint(userId);
    return res.status(200).json(result);
  } catch (error) {
    const errorMessage = 'DATABASE_QUERY_ERROR';
    return res.status(400).json({
      error: errorMessage,
    });
  }
};

module.exports = {
  mypoint,
};
