const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use(cors());
app.use(express.json());
app.use(require('./routes/getProduct.js'));
app.use(require('./routes/addProduct.js'));
app.use(require('./routes/addOrders.js'));
app.use(require('./routes/userLogin.js'));
app.use(require('./routes/admin.js'));
app.use(require('./routes/vendors.js'));
app.listen(3300, () => {
    console.log('server is running at port 3300');
    
})
