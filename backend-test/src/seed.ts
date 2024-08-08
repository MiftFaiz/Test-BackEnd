import mongoose from 'mongoose';
import connectDB from './database';
import Member from './models/Member';
import Book from './models/Book';

const seedData = async () => {
  try {
    // Hubungkan ke database
    await connectDB();

    // Hapus data yang ada sebelumnya (opsional)
    await Member.deleteMany({});
    await Book.deleteMany({});

    // Mock data Members
    const members = [
      { code: 'M001', name: 'Angga' },
      { code: 'M002', name: 'Ferry' },
      { code: 'M003', name: 'Putri' },
    ];

    // Mock data Books
    const books = [
      { code: 'JK-45', title: 'Harry Potter', author: 'J.K Rowling', stock: 1 },
      { code: 'SHR-1', title: 'A Study in Scarlet', author: 'Arthur Conan Doyle', stock: 1 },
      { code: 'TW-11', title: 'Twilight', author: 'Stephenie Meyer', stock: 1 },
      { code: 'HOB-83', title: 'The Hobbit, or There and Back Again', author: 'J.R.R. Tolkien', stock: 1 },
      { code: 'NRN-7', title: 'The Lion, the Witch and the Wardrobe', author: 'C.S. Lewis', stock: 1 },
    ];

    // Masukkan data ke dalam database
    await Member.insertMany(members);
    await Book.insertMany(books);

    console.log('Data seeding completed!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Data seeding error:', err);
    process.exit(1);
  }
};

seedData();
