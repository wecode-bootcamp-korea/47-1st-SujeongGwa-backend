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
const patchProductsInCart = async (user_id, product_name, quantity) => {
  try {
    if (quantity == 0) {
      const err = new Error('0개 미만으로는 숫자를 변경할 수 없습니다.', error);
      err.statusCode = 400;
      throw err;
    }

    const cartPatch = await dataSource.query(
      `
          UPDATE 
          carts 
          SET quantity = ?
          WHERE carts.user_id = ? 
          AND carts.product_id = ?;
          `,
      [quantity, user_id, product_name]
    );
    return cartPatch;
  } catch (error) {
    const err = new Error('INVALID_INPUT_DATA');
    err.statusCode = 400;
    throw err;
  }
};
const deleteProductsInCart = async (users, goods) => {
  try {
    await dataSource.query(
      `
        DELETE FROM carts
        WHERE carts.user_id = ?
        AND carts.product_id = ?
        `,
      [users, goods]
    );
    const message = 'SUCCESS DELETE';
    return message;
  } catch (error) {
    console.error('INVALID_INPUT_DATA', error);
    error.statusCode = 400;
    throw error;
  }
};
const getCarts = async (userId) => {
  const cartItems = await dataSource.query(
    `SELECT 
        carts.product_id,
        products.id,
        products.price,
        products.weight,
        carts.quantity 
      FROM 
        carts
      JOIN
        products
      ON
        carts.product_id = products.id
      WHERE 
        user_id = ?`,
    [userId]
  );

  return {
    cartItems,
  };
};

const modifyCarts = async (userId, products) => {
  for (let product of products) {
    await dataSource.query(
      `UPDATE 
        carts 
       SET 
        quantity = ? 
       WHERE 
        user_id = ? AND product_id = ?`,
      [product.quantity, userId, product.productId]
    );
  }
};


module.exports = {
  patchProductsInCart,
  deleteProductsInCart,
  createCart,
  getProductById,
  queryCartItems,
  getCarts,
  modifyCarts,
};
