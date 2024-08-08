import express from 'express';
import connectDB from './database';
import memberRoutes from './routes/memberRoutes';
import bookRoutes from './routes/bookRoutes';

const app = express();
const port = 3000;

// Connect to Database
connectDB();

// Middleware untuk parsing JSON
app.use(express.json()); // Pastikan middleware ini ada

// Routes
app.use('/api/members', memberRoutes);
app.use('/api/books', bookRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
