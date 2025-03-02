CREATE TABLE IF NOT EXISTS student (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(255),
  Vorname VARCHAR(255),
  Email VARCHAR(255)
);

INSERT INTO student (Name, Vorname, Email) VALUES
('Doe', 'John', 'john.doe@example.com'),
('Muster', 'Max', 'max.muster@example.com');
