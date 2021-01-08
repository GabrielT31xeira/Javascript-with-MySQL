const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { request, response } = require('express');

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const pool = mysql.createPool({
    connectionLimit : 10,
    host:           'localhost',
    user:           'root',
    password:       '',
    database:       'nodejs'
});

app.get('/allbears', (request, response)=>{
    pool.getConnection((error, connection) => {
        if(error) throw error
        console.log(`Connect as id ${connection.threadId}`);

        connection.query('SELECT * FROM beers',(error, rows) => {
            connection.release()

            if(!error){
                response.send(`erro no if ${rows}`);
            }else{
                console.log(`erro no else ${error}`);
            }
        });
    })
});

app.listen(port, ()=> console.log(`Linsten on port ${port}`));