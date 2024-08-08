import { Request, Response } from 'express';
import Member from '../models/Member';
import Book from '../models/Book';

// Get All Members
export const getMembers = async (req: Request, res: Response) => {
  try {
    const members = await Member.find().populate('books');
    res.json(members);
  } 
  catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

// Add New Member
export const addMember = async (req: Request, res: Response) => {
  const { code, name } = req.body;
  const member = new Member({ code, name });

  try {
    const newMember = await member.save();
    res.status(201).json(newMember);
  } 
  catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

export const borrowBook = async (req: Request, res: Response) => {
    try {
      const { memberCode, bookCode } = req.body;
  
      // Cari member dan buku berdasarkan code
      const member = await Member.findOne({ code: memberCode });
      const book = await Book.findOne({ code: bookCode });
  
      if (!member || !book) {
        return res.status(404).json({ message: 'Member or Book not found' });
      }
      
      // Cek apakah buku tersedia (stok > 0)
      if (book.stock <= 0) {
        return res.status(400).json({ message: 'Book is not available' });
      }

      // Cek apakah member telah meminjam 2 buku
      if (member.books.length >= 2) {
        return res.status(403).json({ message: 'Member cannot borrow more than 2 books' });
      }
  
      // Tambahkan buku ke daftar buku yang dipinjam oleh member
      member.books.push(book.id);
      await member.save();
  
      // Kurangi stok buku
      book.stock -= 1;
      await book.save();
  
      return res.status(200).json({ message: 'Book borrowed successfully', member, book });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ message: err.message });
      } else {
        res.status(500).json({ message: 'Unknown error occurred' });
      }
    }
  };
  

  // Return Book
  export const returnBook = async (req: Request, res: Response) => {
    try {
      const { memberCode, bookCode } = req.body;
  
      // Cari member dan buku berdasarkan code
      const member = await Member.findOne({ code: memberCode });
      const book = await Book.findOne({ code: bookCode });
  
      if (!member || !book) {
        return res.status(404).json({ message: 'Member or Book not found' });
      }
  
      // Cek apakah buku dipinjam oleh member
      const bookIndex = member.books.indexOf(book.id);
      if (bookIndex === -1) {
        return res.status(400).json({ message: 'Book not borrowed by this member' });
      }
  
      // Hapus buku dari daftar buku yang dipinjam oleh member
      member.books.splice(bookIndex, 1);
      await member.save();
  
      // Tambah stok buku
      book.stock += 1;
      await book.save();
  
      return res.status(200).json({ message: 'Book returned successfully', member, book });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ message: err.message });
      } else {
        res.status(500).json({ message: 'Unknown error occurred' });
      }
    }
  };
  
  