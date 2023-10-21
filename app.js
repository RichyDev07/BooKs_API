
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Book = require('./models/bookModel');
const PORT = process.env.PORT || 8000;


const app = express();
const bookRouter = express.Router();
const db = mongoose.connect('mongodb://127.0.0.1:27017/collectionName')
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send("Welcome to my API");
});

bookRouter.route('/books')
    .get(async (req, res) => {
        try {
            const books = await Book.find()
            res.json(books);
        } catch (err){
            return res.send(err);
        }
    });

   
app.use('/api', bookRouter);


app.listen(PORT, () => {
    console.log("app running on " + PORT);
});


