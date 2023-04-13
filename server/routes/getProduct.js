const express = require('express');
const client = require('../connection.js');
const app = express();

app.get('/', (req, res) => {
    const query = "SELECT * FROM  product p INNER JOIN product_image pi ON p.product_id = pi.product_id";
    client.query(query, (error, result) => {
        if(error)
            console.log(error);
        else
            res.status(200).send(result.rows);
    });
    
})

app.get('/getDetails/(:id)', (req, res) => {
    const id = req.params.id;
    // const query = `SELECT p.*, i.image_path FROM product p INNER JOIN product_image i ON p.product_id = i.product_id WHERE p.product_id = ${id}`;
    const query = `SELECT p.*, STRING_AGG(i.image_path, ',') as image_path FROM product p INNER JOIN product_image i ON p.product_id = i.product_id WHERE p.product_id = ${id} GROUP BY p.product_id`;
    client.query(query, (error, result) => {
        if(error)
            console.log(error);
        else
            res.status(200).send(result.rows);
    })
})
module.exports = app;