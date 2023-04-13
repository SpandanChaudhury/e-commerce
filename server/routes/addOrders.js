const express = require('express');
const client = require('../connection.js');
const app = express();

app.post('/addOrders', (req, res) => {
    console.log(req.body);
    const orders = req.body.orders;
    const user_id = req.body.user_id;
    const bill_id = req.body.bill_id;
    client.query('BEGIN');
    for(let i = 0; i < orders.length; i++)
    {
        const query = `INSERT INTO orders(bill_id, user_id, product_id, quantity, total_cost) VALUES(${bill_id}, ${user_id}, ${orders[i].product_id}, ${orders[i].quantity}, ${orders[i].total})`;
        console.log(query);
        client.query(query, (error, result) => {
            if(error)
            {
                console.log(`could not insert into orders table with product id - ${orders[i].product_id} and total cost - ${orders[i].total}`);
                client.query('ROLLBACK');
                const query_del = `DELETE FROM bill WHERE bill_id = ${bill_id}`;
                res.status(400).send(error);
            }
            
        });
    }
    client.query('COMMIT');
    res.status(200).send('Success');

});

app.post('/addBill', (req, res) => {
    // console.log(req.body);
    const { bill_amount, date, user_id } = req.body;
    const query = `INSERT INTO bill(user_id, bill_date, bill_amount) VALUES(${user_id}, '${date}', ${bill_amount}) RETURNING bill_id`;
    client.query(query, (error, result) => {
        if(error)
        {
            console.log('could not insert into db');
            res.status(400).send(error);
        }
        else
        {
            console.log('entry successful');
            res.status(200).send(result.rows[0]);
        }
    })
});

app.get('/bills/(:id)', (req, res) => {
    console.log(req.params.id);
    const id = req.params.id;
    const query = `SELECT * FROM bill WHERE user_id = ${id}`;
    client.query(query, (error, result) => {
        if(error)
        {
            console.log('some error occured');
            res.status(400).send(error);
        }
        else if(result.rowCount == 0)
        {
            console.log('no bills yet');
            res.status(203).send('No entry');
        }
        else
        {
            res.status(200).send(result.rows);

        }
    })
});

app.get('/orders/(:id)', (req, res) => {
    
    const id = req.params.id;
    const query = `SELECT o.*, p.product_name, p.price FROM orders o INNER JOIN product p ON o.product_id = p.product_id WHERE o.bill_id = ${id}`;
    client.query(query, (error, result) => {
        if(error)
        {
            console.log('some error occured');
            res.status(400).send(error);
        }
        else
            res.status(200).send(result.rows);
    })
});

module.exports = app;