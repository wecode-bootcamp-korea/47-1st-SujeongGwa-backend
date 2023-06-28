-- migrate:up
SET FOREIGN_KEY_CHECKS = 0;
ALTER TABLE products
MODIFY COLUMN surface_type_id INT NOT NULL;
SET FOREIGN_KEY_CHECKS = 1;
-- migrate:down

