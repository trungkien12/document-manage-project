const path      = require('path');
const express   = require('express');
const morgan    = require('morgan');
const exphbs    = require('express-handlebars');
const app       = express();
const port      = 3000;

const route = require('./routes');
const db = require('./config/db')

//Cokie parse
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

//Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
//HTTP logger
app.use(morgan('combined'));
//Template engine
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));
//Route init
route(app);

app.listen(port, 3000);