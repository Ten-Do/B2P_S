CREATE TABLE payment_systems (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  fee INTEGER CHECK (fee >= 0 AND fee <= 100),
  min_fee INTEGER
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  amount INTEGER,
  fee INTEGER, -- в копейках, а не в процентах
  email VARCHAR(100),
  description TEXT,
  payment_system INTEGER REFERENCES payment_systems(id),
  status VARCHAR(10)
);