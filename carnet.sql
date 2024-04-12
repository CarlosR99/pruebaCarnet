CREATE DATABASE IF NOT EXISTS carnet;

USE carnet;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  codigo VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  documento BLOB,
  foto BLOB
);