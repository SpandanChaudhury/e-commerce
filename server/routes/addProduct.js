const express = require('express');
const multer = require('multer');
const client = require('../connection.js');
const fs = require('fs');
const app = express();
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, '..//src//assets//images//');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage
}).array('files', 10);

app.post('/addProduct', (req, res) => {
    upload(req, res, function(err){
        if(err)
        {
            console.log(err);
            res.status(400).send('could not upload');
        }
        else
        {
            // console.log(req.files);
            // response.send('file uploaded');
            const files = req.files;
            console.log(req.body);
            const {name, description, price, vendor} = req.body;
            
            client.query("BEGIN");
            const query = `INSERT INTO product(product_name, description, price, vendor_id) VALUES('${name}', '${description}', ${price}, ${vendor}) RETURNING product_id`;
            client.query(query, (error, result) => {
                if(error)
                {
                    console.log('could not add product');
                    // res.status(400).send(error);
                }
                else
                {
                    const id = result.rows[0].product_id;
                    console.log(id);
                    for(let i = 0; i < files.length; i++)
                    {
                        const query_insert_image = `INSERT INTO product_image(product_id, image_path) VALUES(${id}, '${files[i].filename}')`;

                        console.log('file number ' + i + files[i]);
                        //  console.log(files[i].filename);
                        console.log(query_insert_image);
                        client.query(query_insert_image, (error, result) => {
                            if(error)
                            {
                                console.log(error);
                                client.query('ROLLBACK');
                                res.send('error in adding images');
                            }
                            else
                            {
                                console.log(result);
                            }
                        })
                    }
                    client.query('COMMIT'); 
                    res.status(200).send('Product added succesfully');
                }
            })
           

        }
    })
});

// image update is pending.
app.post('/edit/(:id)', (req, res) => {
    console.log(req.body);
    console.log(req.params.id);
    const query = `UPDATE product SET product_name = '${req.body.product_name}', description = '${req.body.description}', price = ${req.body.price}, vendor_id = ${req.body.vendor_id} WHERE product_id = ${req.params.id}`;

    client.query(query, (error, result) => {
        if(error)
        {
            console.log('some error occured');
            res.status(400).send(error);
        }
        else
        {
            console.log('updated details');
            res.status(200).send('safe to redirect');
        }
    })
})

app.post('/delete/(:id)', (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    // src\assets\images\1681112077576-clock.jpg
    const filepath = '../src/assets/images/' + req.body.image;
    client.query('BEGIN');
    const query =  `DELETE FROM product WHERE product_id = ${req.params.id}`;
    client.query(query, (error, result) => {
        if(error)
        {
            console.log('could not delete product');
            client.query('END');
            res.status(400).send(error);
        }
        else
        {
            console.log('product deleted');
            const query_del_img = `DELETE FROM product_image WHERE product_id = ${req.params.id}`;
            client.query(query_del_img, (error, result) => {
                if(error)
                {
                    console.log('could not delete image path from table');
                    client.query('ROLLBACK');
                    res.status(203).send('retry');
                }
                else
                {
                    fs.unlink(filepath, (err) => {
                        if(err)
                        {
                            console.log('could not unlink file');
                            client.query('ROLLBACK');
                            res.status(203).send(err);
                        }
                        else
                        {
                            client.query('COMMIT');
                            res.status(200).send('deletion successful');
                        }
                    })
                }
            })
        }
    })
})
module.exports = app;