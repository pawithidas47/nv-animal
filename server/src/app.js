const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const config = require('./config/config');
const { sequelize } = require('./models'); // ทำการ import sequelize จาก models

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/assets', express.static('public'));

// เชื่อมต่อกับฐานข้อมูล
// const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, config.db.options); // ย้ายไปที่ models แล้ว

// import routes
require('./userPassport'); // ทำการ import การรับรองความถูกต้อง (ถ้ามี)
require('./routes')(app); // ทำการ import routes

let port = config.port;

sequelize.sync({ force: false }).then(() => {
    app.listen(port, function () {
        console.log('Server running on ' + port);
    });
}).catch(error => {
    console.error('Unable to connect to the database:', error);
});
