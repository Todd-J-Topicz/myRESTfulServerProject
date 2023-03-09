//console.log("Made it inside seed.js");

const { Pool } = require('pg');
const dbConn = require('./dbConn');
const pool = dbConn.getPool();

function runSeeder(pool, callback){
    pool.connect((err, done) => {
        if (err) {
            console.log("Failed to connect to the database");
            console.log(err);
            return done();
        }

        //Run SEED SQL:
        pool.query(`INSERT INTO studio (name) VALUES 
            ('Activision'),
            ('Bethesda Softworks'),
            ('Bungie'),
            ('Massive Entertainment')`,
            (err) => {
                if (err){
                    console.log("INSERT FAILED on studio")
                } else {
                    console.log("STUDIO INSERT SUCCESSFUL")
                    pool.query(`INSERT INTO games (name, year, studio_id) VALUES 
                    ('Modern Warfare 2', 2022, 1),
                    ('Fallout 76', 2018, 2),
                    ('Destiny 2', 2017, 3),
                    ('Division 2', 2019, 4),
                    ('Halo: Reach', 2010, 3),
                    ('The Elder Scrolls V: Skyrim', 2011, 2)`,
                    (err) => {
                        if (err){
                            console.log("INSERT FAILED on games")
                        } else {
                            console.log("INSERT games SUCCESSFUL")
                            done();
                            callback();
                        }
                    })    
                }
            }
        )        
    })
}

runSeeder(pool, () => {
    //close connection:
    pool.end();
});  




