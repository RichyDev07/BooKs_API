

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Book = require('./models/bookModel'); 

const PORT = process.env.PORT || 8000;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/booksdata', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Welcome to my API");
});

const createBookRouter = require('./routes/bookRouter')(Book); 

const bookRouter = createBookRouter; 
app.use('/api', bookRouter);

app.listen(PORT, () => {
    console.log("App running on port " + PORT);
});


