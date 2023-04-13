const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'spandan',
    database: 'ecommerce'
});

client.connect(error => {
    if(error)
        console.log(error);
    else
        console.log('connected');
});

module.exports = client;
