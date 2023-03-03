const { Pool } = require('pg');
const DATABASE_URL = process.env.DATABASE_URL;
const pool = require('./dbConn');

//run migration SQL:
pool.query(`CREATE TABLE IF NOT EXISTS studio (
    id SERIAL PRIMARY KEY,
	name VARCHAR (100) NOT NULL)`, (err, data) => {
        if (err) {
            console.log("CREATE TABLE studios FAILED")
        } else {
            console.log("studios CREATE TABLE successful")
        }
    }
);

pool.query(`CREATE TABLE IF NOT EXISTS games (
    id SERIAL PRIMARY KEY,
	name VARCHAR (100) NOT NULL,
    year INT NOT NULL,
	studio_id INT NOT NULL, 
    FOREIGN KEY (studio_id) REFERENCES studio.id)`, (err, data) => {
        if (err) {
            console.log("CREATE TABLE games FAILED")
        } else {
            console.log("games CREATE TABLE successful")
        }
    }
);

//close connection:
pool.end();