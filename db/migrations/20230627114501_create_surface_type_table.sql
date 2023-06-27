-- migrate:up
CREATE TABLE surface_type(
  id INT NOT NULL AUTO_INCREMENT,
  type VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE surface_type;