-- migrate:up
CREATE TABLE orders(
  id INT NOT NULL AUTO_INCREMENT,
  order_number INT NOT NULL,
  user_id INT NOT NULL,
  order_status_id INT,
  total_price DECIMAL NULL, 
  total_weight INT NULL,
  address VARCHAR(500) NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (order_status_id) REFERENCES order_status(id)
);

-- migrate:down
DROP TABLE orders;