const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app
.engine('html', require('ejs').renderFile)
.set('view engine', 'html')
.set('views', path.resolve(__dirname, '../views'))
.use(express.static(path.resolve(__dirname, '../public')))
.use(bodyParser.urlencoded({ extended: true }))
.use(bodyParser.json())
.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

module.exports = function(){ return app; }


// .engine('pug', require('pug').__express)
// .set('view engine', 'pug')

