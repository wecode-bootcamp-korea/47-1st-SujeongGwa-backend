-- migrate:up
ALTER TABLE products
ADD FOREIGN KEY (surface_type_id) REFERENCES surface_type(id);

-- migrate:down

