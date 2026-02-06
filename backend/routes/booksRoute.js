import express from 'express';
import mongoose from "mongoose";
import { Book } from '../models/bookModel.js';

const bookRouter = express.Router();


//Route for Save a new book
bookRouter.post('/', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({message:'Send all required fields: title, author, publishYear'})
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }
        const book = await Book.create(newBook);
        return res.status(201).send(book);
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message:error.message})
    }

})

//Route for Get All books from database 
bookRouter.get('/', async (req, res) =>{
    try {
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books
        });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message})
        
    }
});

//Route for Get one book from database by id
bookRouter.get('/:id', async (req, res) =>{
    try {

        const {id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) { return res.status(400).json({ message: "Invalid ID format" }); }

        const book = await Book.findById(id);

        if (!book) { return res.status(404).json({ message: "Book not found" }); }

        return res.status(200).json(book);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message})
        
    }
})

//Route for Update a Book

bookRouter.put('/:id', async (req, res) =>{
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({message:'Send all required fields: title, author, publishYear'})
        }

        const {id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) { return res.status(400).json({ message: "Invalid ID format" }); }

        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result ) {
            return res.status(404).json({message: "Book not found"});
        }

        return res.status(200).send({message: "Book updated successfully"});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message})
        
    }
})

//Route for Delete a Book

bookRouter.delete('/:id', async (req, res) =>{
    try {

        const {id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) { return res.status(400).json({ message: "Invalid ID format" }); }

        const result = await Book.findByIdAndDelete(id);

        if (!result) { return res.status(404).json({ message: "Book not found" }); }

        return res.status(200).send({message: 'Book deleted successfully'});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message})
        
    }
})

export default bookRouter;