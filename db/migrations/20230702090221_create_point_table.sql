-- migrate:up
CREATE TABLE points(
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  order_order_number INT NOT NULL,
  order_total_price DECIMAL NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);
  
-- migrate:down
DROP TABLE points;
