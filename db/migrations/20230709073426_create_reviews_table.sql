-- migrate:up
CREATE TABLE products_reviews (
  id INT NOT NULL AUTO_INCREMENT,
  order_user_id INT NOT NULL,
  product_id INT NOT NULL,
  text VARCHAR(200),
  rating DECIMAL(10, 1),
  PRIMARY KEY (id),
  FOREIGN KEY (order_user_id) REFERENCES orders (user_id),
  FOREIGN KEY (product_id) REFERENCES products (id)
);
-- migrate:down

