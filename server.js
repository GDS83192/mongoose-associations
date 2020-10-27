// Reference for using app.locals and timestamps https://stackoverflow.com/questions/12794860/how-to-use-node-modules-like-momentjs-in-ejs-views 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const PORT = 3000;
var moment = require('moment');
var shortDateFormat = "ddd @ h:mmA"; // this is just an example of storing a date format once so you can change it in one place and have it propagate
app.locals.moment = moment; // this makes moment available as a variable in every EJS page
app.locals.shortDateFormat = shortDateFormat;
const dayjs = require('dayjs')
app.locals.dayjs = require('dayjs');
const mongoURI = 'mongodb://localhost:27017/mongoRelationships';

mongoose.connect(
    mongoURI, { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('the connection with mongod is established');
    }
);

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(methodOverride('_method'));


// ABOVE our app.get()
app.use('/users', require('./controllers/usersController'));
app.use('/albums', require('./controllers/albumsController'));
app.get('/', (req, res) => {
    res.render('home.ejs');
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});