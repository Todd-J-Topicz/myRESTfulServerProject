const { Pool } = require('pg');
const pool = require('./dbConn');

pool.query('SELECT * FROM studio', (err,data) => {
    //console.log("made it here");
    console.log(data);

    if (data == undefined){
        pool.query(`INSERT INTO studio (name) VALUES 
            ('Activision'),
            ('Bethesda Softworks'),
            ('Bungie'),
            ('Massive Entertainment')`,
            (err, data) => {
                if (err){
                    console.log("INSERT FAILED")
                } else {
                    console.log("INSERT SUCCESSFUL")
                }
            }
        )
    }
})

pool.query('SELECT COUNT(*) FROM games', (err,data) => {
    console.log(data);

    if (data == undefined){
        pool.query(`INSERT INTO games (name, year, studio_id) VALUES 
            ('Modern Warfare 2', 2022, 1),
            ('Fallout 76', 2018, 2),
            ('Destiny 2', 2017, 3),
            ('Division 2', 2019, 4),
            ('Halo: Reach', 2010, 3),
            ('The Elder Scrolls V: Skyrim', 2011, 2)`,
            (err, data) => {
                if (err){
                    console.log("INSERT FAILED")
                } else {
                    console.log("INSERT SUCCESSFUL")
                }
            }
        )
    }
})



//close connection:
pool.end();