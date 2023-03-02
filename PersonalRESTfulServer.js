//SETUP DEPENDECIES:
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 8000;
app.use(express.json());
const { listenerCount } = require('stream');

const pool = new Pool ({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'petshop',
    password: 'password',
    port: 5432,
});

