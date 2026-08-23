CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE contents (
  id SERIAL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  category_id INTEGER REFERENCES categories(id)
);

CREATE TABLE progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  content_id INTEGER NOT NULL REFERENCES contents(id),
  completed BOOLEAN DEFAULT FALSE,
  UNIQUE(user_id, content_id)
);

CREATE TABLE attachments (
  id SERIAL PRIMARY KEY,
  content_id INTEGER NOT NULL REFERENCES contents(id),
  file_name VARCHAR(255) NOT NULL,
  file_url VARCHAR(500) NOT NULL
);