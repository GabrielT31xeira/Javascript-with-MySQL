const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { request, response } = require('express');

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs'
});

app.get('/allbears', (request, response) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
            console.log(`Connect as id ${connection.threadId}`);
        
        connection.query('SELECT * FROM beers', (errno, rows) => {
            connection.release()

            if (!errno) {
                response.send(rows);
            } else {
                console.log(`erro no else ${errno}`);
            }
        });
    })
});

app.get('/:id', (request, response) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
            console.log(`Connect as id ${connection.threadId}`);
        
        connection.query('SELECT * FROM beers WHERE id=?',[request.params.id], (err, rows) => {
            connection.release()

            if (!err) {
                response.send(rows);
            } else {
                console.log(`erro no else ${err}`);
            }
        });
    })
});

app.delete('/:id', (request, response) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
            console.log(`Connect as id ${connection.threadId}`);
        
        connection.query('DELETE from beers where id=?',[request.params.id], (err, rows) => {
            connection.release()

            if (!err) {
                response.send(`Sukin removido id:${[request.params.id]} ;(`);
            } else {
                console.log(`erro no else ${err}`);
            }
        });
    })
});

app.post('/newBeers', (request, response) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
            console.log(`Connect as id ${connection.threadId}`);

        const params = request.body;
        
        connection.query('INSERT INTO beers SET ?', params , (err, rows) => {
            connection.release()

            if (!err) {
                response.send(`Sukin adcinado :) nome: ${params.name}`);
            } else {
                console.log(`erro no else ${err}`);
            }
        });
        console.log(params);
    })
});

app.put('/updateBeer', (request, response) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
            console.log(`Connect as id ${connection.threadId}`);

        const params = request.body;
        const {id, name, tagline, description, image } = request.body;
        
        connection.query('UPDATE beers SET name = ?, tagline = ?, description = ?, image = ? WHERE id = ?',
        [name,tagline,description,image,id] , (err, rows) => {
            connection.release()

            if (!err) {
                response.send(`Sukin atualizado :) nome: ${params.name}`);
            } else {
                console.log(`erro no else ${err}`);
            }
        });
        console.log(params);
    })
});

app.listen(port, () => console.log(`Linsten on port ${port}`));