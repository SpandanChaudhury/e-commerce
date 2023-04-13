const express = require('express');
const client = require('../connection.js');
const app = express();

app.post('/login', (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    const query = `SELECT * FROM users WHERE email = '${email}'`;
    client.query(query, (error, result) => {
        if(error)
        {
            console.log('some error occured');
            res.status(400).send(error);
        }
        else
        {
            if(result.rowCount > 1)
            {
                res.status(200).send('more than one record found');
            }
            else if(result.rowCount == 0)
            {
                res.status(204).send('no user found, please register');
            }
            else
            {
                if(result.rows[0].password === password)
                {
                    console.log('user found');
                    res.status(200).send(result.rows[0]);
                }
                else
                {
                    res.status(203).send('incorrect password');
                }
            }
        }
    })
});

app.post('/signup', (req, res) => {
    console.log(req.body);
    const {fname, lname, address, phone, gender, email, password} = req.body;
    const query = `INSERT INTO users(first_name, last_name, gender, address, phone, email, password)
    VALUES('${fname}', '${lname}', '${gender}', '${address}', '${phone}', '${email}', '${password}')`;

    console.log(query);
    client.query(query, (error, result) => {
        if(error)
        {
            console.log('could not insert into database');
            res.status(400).send(error);
        }
        else
            res.status(200).send('user added');
    })
});


app.get('/users', (req, res) => {
    const query = `SELECT * FROM users`;
    client.query(query, (error, result) => {
        if(error)
        {
            console.log('some error occured');
            res.status(400).send(error);
        }
        else
        {
            res.status(200).send(result.rows);
        }
    })
})
module.exports = app;