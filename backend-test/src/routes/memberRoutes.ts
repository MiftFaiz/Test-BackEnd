import express from 'express';
import { getMembers, addMember, borrowBook, returnBook } from '../controllers/memberController';

const router = express.Router();

router.get('/', getMembers);
router.post('/', addMember);
router.post('/borrow', borrowBook);
router.post('/return', returnBook);

export default router;
