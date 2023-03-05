const { Pool } = require('pg');
const dbConn = require('./dbConn');
const DATABASE_URL = process.env.DATABASE_URL;
const pool = dbConn.getPool();

function runMigration(pool, callback){
    //Connect to DB:
    pool.connect((err, client, done) => {
        if (err){
            console.log("Failed to connect to the database");
            console.log(err);
            return done();
        }
        //RUN migration SQL:
        pool.query('DROP TABLE IF EXISTS games');


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
        pool.query(`CREATE TABLE games (
            id SERIAL PRIMARY KEY,
            name VARCHAR (100) NOT NULL,
            year INT NOT NULL,
            studio_id INT NOT NULL, 
            FOREIGN KEY (studio_id) REFERENCES studio(id) ON DELETE CASCADE)`, (err, data) => {
                if (err) {
                    console.log("CREATE TABLE games FAILED")
                } else {
                    console.log("games CREATE TABLE successful")
                }
            }
        );
    })

};

runMigration(pool, () => {
    //migrations are complete, we can close the pool
    //close connection:
    pool.end();
})



