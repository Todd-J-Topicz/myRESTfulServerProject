


CREATE TABLE studio (
	id SERIAL PRIMARY KEY,
	name VARCHAR (100) NOT NULL
);

INSERT INTO studio (name) VALUES ('Activision');
INSERT INTO studio (name) VALUES ('Bethesda Softworks');
INSERT INTO studio (name) VALUES ('Bungie');
INSERT INTO studio (name) VALUES ('Massive Entertainment');

CREATE TABLE games (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	year INT NOT NULL,
	studio_id INT NOT NULL, 
    FOREIGN KEY (studio_id) REFERENCES studio(id) ON DELETE CASCADE
);


INSERT INTO games (name, year, studio_id) VALUES ('Modern Warfare 2', 2022, 1);
INSERT INTO games (name, year, studio_id) VALUES ('Fallout 76', 2018, 2);
INSERT INTO games (name, year, studio_id) VALUES ('Destiny 2', 2017, 3);
INSERT INTO games (name, year, studio_id) VALUES ('Division 2', 2019, 4);