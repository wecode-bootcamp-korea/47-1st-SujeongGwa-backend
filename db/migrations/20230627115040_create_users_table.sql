-- migrate:up
CREATE TABLE users(
  id INT NOT NULL AUTO_INCREMENT,
  type_id INT NOT NULL,
  account VARCHAR(50) NULL,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(50) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(id),
  FOREIGN KEY (type_id) REFERENCES types (id)
);

-- migrate:down
DROP TABLE users;