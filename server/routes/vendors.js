const express = require('express');
const client = require('../connection.js');
const app = express();

app.get('/vendors', (req, res) => {
    const query =  `SELECT * FROM vendor`;
    client.query(query, (error, result) => {
        if(error)
        {
            console.log('some error occured');
            res.status(400).send(error);
        }
        else if(result.rowCount == 0)
        {
            res.status(203).send('no vendor found');
        }
        else
        {
            console.log('vendors present');
            res.status(200).send(result.rows);
        }
    })
});

app.post('/addVendor', (req, res) => {
    console.log(req.body);
    const query = `INSERT INTO vendor(vendor_name, email, phone, address) VALUES ('${req.body.name}', '${req.body.email}', '${req.body.phone}', '${req.body.address}')`;
    console.log(query);

    client.query(query, (error, result) => {
        if(error)
        {
            console.log('could not insert vendor details');
            res.status(400).send(error);
        }
        else
        {
            console.log('vendor added');
            res.status(200).send('vendor added');
        }
    })
});

app.get('/vendors/(:id)', (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM product WHERE vendor_id = ${id}`;
    client.query(query, (error, result) => {
        if(error)
        {
            console.log('some error occured');
            res.status(400).send(error);
        }
        else if(result.rowCount == 0)
        {
            console.log('no product found');
            res.status(203).send('no product found');
        }
        else
        {
            res.status(200).send(result.rows)
        }
    });
});

module.exports = app;
