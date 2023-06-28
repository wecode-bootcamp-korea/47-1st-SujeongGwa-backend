-- migrate:up
CREATE TABLE sub_categories(
  id INT NOT NULL AUTO_INCREMENT,
  size VARCHAR(100) NOT NULL,
  category_id int,
  PRIMARY KEY(id),
  FOREIGN KEY (category_id) REFERENCES categories (id)
);

-- migrate:down
DROP TABLE sub_categories;