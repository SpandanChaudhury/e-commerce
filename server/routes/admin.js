const express = require('express');
const client = require('../connection.js');
const app = express();

app.post('/adminLogin', (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    const query = `SELECT * FROM admin WHERE email = '${email}'`;

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
                console.log('more than 1 row found');
                res.status(204).send('more than 1 admin found');
            }
            else if( result.rowCount == 0)
            {
                console.log('no admin with the given email found');
                res.status(205).send('no admin with the given email ');
            }
            else
            {
                if(result.rows[0].password == password)
                {
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
module.exports = app;