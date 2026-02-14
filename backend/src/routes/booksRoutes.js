import express from 'express';
import { createBook, deleteBook, getAllBooks, getBook, updateBook } from '../controllers/booksController.js'
import { validateObjectId } from '../middleware/validateObjectId.js';

const router = express.Router();


//Route for Save a new book
router.post('/', createBook)

//Route for Get All books from database 
router.get('/', getAllBooks);

//Route for Get one book from database by id
router.get('/:id',validateObjectId, getBook)

//Route for Update a Book

router.put('/:id', validateObjectId, updateBook)

//Route for Delete a Book

router.delete('/:id', validateObjectId, deleteBook)

export default router;