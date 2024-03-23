CREATE TABLE rel2(
id SERIAL PRIMARY KEY,
data jsonb
);
================================================
INSERT INTO rel2(data)
VALUES('{"daughter":{"id":1,"daughter":"Rita"}}'),
      ('{"son":{"id":1,"son":"Mikle Doe"}}');

