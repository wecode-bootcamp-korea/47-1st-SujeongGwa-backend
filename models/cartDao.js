const dataSource = require('./dataSource');

const queryCartItems = async (userId) => {
  try {
    const data = await dataSource.query(
      `
      SELECT
        carts.id AS cartId,
        users.id AS userId,
        users.name,
        users.email,
        carts.product_id AS productId,
        categories.title AS kindId,
        products.name AS tileName,
        products.sub_category_id AS sizeId,
        products.surface_type_id AS surfaceTypeId,
        products.price AS price,
        products.weight AS weight,
        products.image_url AS imageUrl,
        carts.quantity AS quantity
      FROM
        carts
      JOIN
        users ON carts.user_id = users.id
      LEFT JOIN
        products ON carts.product_id = products.id
      JOIN
        sub_categories ON products.sub_category_id = sub_categories.id
      JOIN
        categories ON sub_categories.category_id = categories.id
      WHERE
        users.id = ?
        `,
      [userId]
    );
    return data;
  } catch (err) {
    const error = new Error('DATABASE_QUERY_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

const createCart = async (userId, productId, quantity) => {
  try {
    const carts = await dataSource.query(
      `INSERT INTO 
        carts (
        user_id,
        product_id, 
        quantity
        ) VALUES (?,?,?)`,
      [userId, productId, quantity]
    );

    return carts;
  } catch (error) {
    console.error('INVALID_INPUT_DATA', error);
    error.statusCode = 400;
    throw error;
  }
};

const getProductById = async (productId) => {
  const product = await dataSource.query(
    `SELECT * FROM products WHERE id = ?`,
    [productId]
  );

  return product;
};

module.exports = {
  createCart,
  getProductById,
  queryCartItems,
  dataSource,
};
