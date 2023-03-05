'use strict';

const dotenv = require('dotenv');
dotenv.config();
console.log(process.env);

//SETUP DEPENDECIES:
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 8000;
app.use(express.json());
const { listenerCount } = require('stream');

const dbConn = require('./dbConn');
const pool = dbConn.getPool();

//Query with "/studio" request:
app.get('/api/studio' , (request, response, next) => {
    //console.log("made it inside .get");
    pool.query('SELECT * FROM studio', (err,result) => {
        if (err){
            //console.log("made it here")
            return next({})
        } else {
            const rows = result.rows;
            //console.log("made it to return info statment")
            //console.log("result" ,rows);
            response.status(200).send(rows);
        }
    })
})

app.get('/api/studio/:id', function(req, res, next){
    const id = Number.parseInt(req.params.id);

    pool.query(`SELECT * FROM studio WHERE id=$1`, [id], (err,result) => {
        if (err){
            return next({})
        }

        const studio = result.rows;
        //console.log("individual game", game);
        res.status(202).send(studio);
    })
})

//Query against a provided all "games":
app.get('/api/games/', function(req, res, next){
    const id = Number.parseInt(req.params.id);

    pool.query(`SELECT * FROM games`, (err,result) => {
        if (err){
            return next({})
        }

        const game = result.rows;
        //console.log("individual game", game);
        res.status(202).send(game);
    })
})

//Query against a provided ID with "games":
app.get('/api/games/:id', function(req, res, next){
    const id = Number.parseInt(req.params.id);

    pool.query(`SELECT * FROM games WHERE id=$1`, [id], (err,result) => {
        if (err){
            return next({})
        }

        const game = result.rows;
        //console.log("individual game", game);
        res.status(202).send(game);
    })
})

//CHECKS FOR ANYTHING OTHER THAN "STUDIO" OR "GAMES" AND SENDS ERROR:
app.get("/api/:word/", function (req, res){
    const word = req.params.word;
    res.status(404).send(`NOT FOUND!! - 505 error - /${word}/ does not exist`);
});

app.post('/api/games/', (req, res, next) =>{
    //console.log("made it inside post request");
    const name = req.body.name;
    //console.log(name);
    const year = Number.parseInt(req.body.year);
    //console.log(year);
    const studio_id = Number.parseInt(req.body.studio_id);
    //console.log(studio_id);

    if (!name || !year || !studio_id || Number.isNaN(year)){
        return res.status(400).send("Error in post data, or insufficient data provided for post");
    } 

    pool.query('INSERT INTO games (name, year, studio_id) VALUES ($1, $2, $3) RETURNING *;', [name, year, studio_id], (err,result) => {
        if (err){
            return next({})
        }

        let gameInfo = result.rows[0];
        res.send(gameInfo);
    })
})

app.patch('/api/games/:id', (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    const name = req.body.name;
    const year = Number.parseInt(req.body.year);
    const studio_id = Number.parseInt(req.body.studio_id);

    pool.query('SELECT * FROM games WHERE id=$1', [id], (err, result, next) =>{
        if (err){
            return next({});
        }
        
        let game = result.rows[0];

        if (!game){
            res.send("No game detected")
        }

        const updatedName = name || game.name;
        const updatedYear = year || game.year;
        const updatedStudio_id = studio_id || game.studio_id;
        console.log(updatedName, updatedYear, updatedStudio_id);

        pool.query('UPDATE games SET name=$1, year=$2, studio_id=$3 WHERE id=$4 RETURNING *', [updatedName, updatedYear, updatedStudio_id, id], (err, result) =>{
            if (err){
                res.send("There was an error updating the table")
            }
           
        })

    })
})

app.delete('/api/games/:id', (req, res, next) => {
    const id = Number.parseInt(req.params.id);

    pool.query('DELETE FROM games WHERE id=$1 RETURNING*', [id], (err,data) => {
        if (err){
            res.status(404).send("There was an error with your SQL query for DELETION.")
        }

        const deleted = data.rows[0];

        if (deleted){
            res.send(deleted);
        } else {
            res.send("This ID has not been deleted.")
        }
        
    })    
});

app.post('/api/studio/', (req, res, next) =>{
    //console.log("made it inside post request");
    const name = req.body.name;
   
    if (!name){
        return res.status(400).send("Error in post data, or insufficient data provided for post");
    } 

    pool.query('INSERT INTO studio (name) VALUES ($1) RETURNING *;', [name], (err,result) => {
        if (err){
            return next({})
        }

        let studioInfo = result.rows[0];
        res.send(gameInfo);
    })
})

app.patch('/api/studio/:id', (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    const name = req.body.name;

    pool.query('SELECT * FROM studio WHERE id=$1', [id], (err, result, next) =>{
        if (err){
            return next({});
        }
        
        let studio = result.rows[0];

        if (!studio){
            res.send("No studio detected")
        }

        const updatedName = name || studio.name;
       
        pool.query('UPDATE studio SET name=$1 WHERE id=$4 RETURNING *', [updatedName, id], (err, result) =>{
            if (err){
                res.send("There was an error updating the studio table")
            }
           
        })

    })
})

app.delete('/api/studio/:id', (req, res, next) => {
    const id = Number.parseInt(req.params.id);

    pool.query('DELETE FROM studio WHERE id=$1 RETURNING*', [id], (err,data) => {
        if (err){
            res.status(404).send("There was an error with your SQL query for DELETION.")
        }

        const deleted = data.rows[0];

        if (deleted){
            res.send(deleted);
        } else {
            res.send("This ID has not been deleted.")
        }
        
    })    
});



app.use(function(err, req, res, next){
    console.log("Inside middleware error function");
    res.status(404).send("ERROR 404 - PROBLEM");
});


app.listen(port, function(){
    console.log(`Service is running, listening on ${port}`);
});