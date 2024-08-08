import { Request, Response } from 'express';
import Book from '../models/Book';

// Get All Books
export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find({ stock: { $gt: 0 } });
    res.json(books);
  } 
  catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

// Add New Book
export const addBook = async (req: Request, res: Response) => {
  const { code, title, author, stock } = req.body;
  const book = new Book({ code, title, author, stock });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } 
  catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};
