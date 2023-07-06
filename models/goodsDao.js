const appDataSource = require('./dataSource');

const goodsDao = async (goodsDaoByCategoryId) => {
  try {
    const result = await appDataSource.query(
      `
      SELECT p.id, 
      p.sub_category_id, 
      p.name, 
      p.surface_type_id, 
      p.sell_counts, 
      p.price, 
      p.weight, 
      p.description, 
      p.image_url, 
      c.id AS category_id, 
      c.title AS category_title
      FROM products p
      JOIN sub_categories s ON p.sub_category_id = s.id
      JOIN categories c ON s.category_id = c.id;

            `,
      [goodsDaoByCategoryId]
    );
    if (!result) {
      const error = new Error('INVALID_NUMBER_INPUT');
      error.statusCode = 400;
      throw error;
    }
    return result;
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
};
const goodsDetailDao = async (name) => {
  try {
    const result = await appDataSource.query(
      `
            SELECT *
            FROM products
            WHERE products.name = ?
            `,
      [name]
    );
    if (!result) {
      const error = new Error('INVALID_NAME_INPUT');
      error.statusCode = 400;
      throw error;
    }
    return result;
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
};
module.exports = {
  goodsDao,
  goodsDetailDao,
};
