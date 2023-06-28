-- migrate:up
CREATE TABLE categories(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(50) NOT NULL,
  image_url VARCHAR(1000) NULL,
  PRIMARY KEY (id)
  
);

-- migrate:down
DROP TABLE categories;