import express from 'express';
import { createBook, deleteBook, getAllBooks, getBook, updateBook } from '../controllers/booksController.js'

const router = express.Router();


//Route for Save a new book
router.post('/', createBook)

//Route for Get All books from database 
router.get('/', getAllBooks);

//Route for Get one book from database by id
router.get('/:id', getBook)

//Route for Update a Book

router.put('/:id', updateBook)

//Route for Delete a Book

router.delete('/:id', deleteBook)

export default router;