const express = require('express');
const Book = require('../models/bookModel');

function createBookRouter(Book) {
  const bookRouter = express.Router();

  bookRouter.route('/books')
    .post(async (req, res) => {
      try {
        const book = new Book(req.body);
        await book.save();
        return res.status(201).json(book);
      } catch (err) {
        return res.status(500).json({ error: 'An error occurred' });
      }
    })
    .get(async (req, res) => {
      const query = {};
      if (req.query.genre) {
        query.genre = req.query.genre;
      }

      try {
        const books = await Book.find(query);
        res.json(books);
      } catch (err) {
        return res.status(500).json({ error: 'An error occurred' });
      }
    });

  bookRouter.route('/books/:bookid')
    .get(async (req, res) => {
      try {
        const book = await Book.findById(req.params.bookid);
        if (!book) {
          return res.status(404).json({ error: 'Book not found' });
        }
        res.json(book);
      } catch (err) {
        return res.status(500).json({ error: 'An error occurred' });
      }
    })
.put((req,res)=>{
  Book.findById(req.params.bookid,(err,book)=>{
    
  })
  if(err){
    return res.send(err);
  }
  book.title =req.body.title;
  book.author =req.body.author;
  book.genre =req.body.genre;
  book.read =req.body.read;
  book.save();
  return res.json(book);
})
  return bookRouter;
}

module.exports = createBookRouter;
