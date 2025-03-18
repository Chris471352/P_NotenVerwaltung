CREATE TABLE IF NOT EXISTS Note (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  Semester INT,
  Modulname VARCHAR(255),
  Leistungspunkte INT,
  Note0 INT,
  Note1 INT,
  Note2 INT
);

INSERT INTO Note (Semester, Modulname, Leistungspunkte, Note0, Note1, Note2) VALUES
(1, 'Wirtschaftsmathematik', 5, 2.4, 0, 0),
(1, 'Materialwirtschaft', 4, 1.8, 0, 0);