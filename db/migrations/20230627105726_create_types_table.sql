-- migrate:up
CREATE TABLE types(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
  
);

-- migrate:down
DROP TABLE types;