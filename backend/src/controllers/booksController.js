// import mongoose from "mongoose";
// import { Book } from "../models/Book.js";

// export async function getAllBooks(req, res) {
//   try {
//     const books = await Book.find({});

//     return res.status(200).json({
//       count: books.length,
//       data: books,
//     });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({ message: "Server error"});
//   }
// }



// export async function createBook(req, res) {
//   try {
//     const { title, author, publishYear } = req.body;

//     if (!title || !author || !publishYear) {
//       return res.status(400).json({
//         message: "Send all required fields: title, author, publishYear"
//       });
//     }

//     const book = await Book.create({ title, author, publishYear });

//     return res.status(201).json(book);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// }


// export async function updateBook(req, res) {
//   try {
//     const { title, author, publishYear } = req.body;

//     if (!title || !author || !publishYear) {
//       return res.status(400).json({
//         message: "Send all required fields: title, author, publishYear"
//       });
//     }

//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid ID format" });
//     }

//     const result = await Book.findByIdAndUpdate(
//       id,
//       { title, author, publishYear },
//       { new: true, runValidators: true }
//     );

//     if (!result) {
//       return res.status(404).json({ message: "Book not found" });
//     }

//     return res.status(200).json({ message: "Book updated successfully" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// }

// export async function deleteBook(req, res) {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid ID format" });
//     }

//     const result = await Book.findByIdAndDelete(id);

//     if (!result) {
//       return res.status(404).json({ message: "Book not found" });
//     }

//     return res.status(200).json({ message: "Book deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// }


// export async function getBook(req, res) {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid ID format" });
//     }

//     const book = await Book.findById(id);

//     if (!book) {
//       return res.status(404).json({ message: "Book not found" });
//     }

//     return res.status(200).json(book);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// }

import { Book } from "../models/Book.js";
import { validateRequiredFields } from "../utils/validateRequiredFields.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({});
  res.status(200).json({ count: books.length, data: books });
});

export const createBook = asyncHandler(async (req, res) => {
  if (!validateRequiredFields(req.body, ["title", "author", "publishYear"])) {
    return res.status(400).json({
      message: "Send all required fields: title, author, publishYear"
    });
  }

  const book = await Book.create(req.body);
  res.status(201).json(book);
});



export const updateBook = asyncHandler(async (req, res) => {
  if (!validateRequiredFields(req.body, ["title", "author", "publishYear"])) {
    return res.status(400).json({
      message: "Send all required fields: title, author, publishYear"
    });
  }

  const updated = await Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!updated) return res.status(404).json({ message: "Book not found" });

  res.status(200).json({ message: "Book updated successfully" });
});



export const deleteBook = asyncHandler(async (req, res) => {
  const deleted = await Book.findByIdAndDelete(req.params.id);

  if (!deleted) return res.status(404).json({ message: "Book not found" });

  res.status(200).json({ message: "Book deleted successfully" });
});

export const getBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) return res.status(404).json({ message: "Book not found" });

  res.status(200).json(book);
});
