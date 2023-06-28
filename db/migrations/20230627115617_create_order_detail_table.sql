-- migrate:up
CREATE TABLE order_detail(
  id INT NOT NULL AUTO_INCREMENT,
  order_id INT NOT NULL,
  products_id INT NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- migrate:down
DROP TABLE order_detail;