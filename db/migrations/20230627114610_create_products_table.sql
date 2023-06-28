-- migrate:up
CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  sub_category_id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  surface_type_id VARCHAR(50) NOT NULL,
  sell_counts INT NULL,
  price DECIMAL(10, 2) NOT NULL,
  weight INT NOT NULL,
  description VARCHAR(1000),
  image_url VARCHAR(1000) NULL,
  PRIMARY KEY(id),
FOREIGN KEY (sub_category_id) REFERENCES sub_categories (id)
);

-- migrate:down
DROP TABLE products;