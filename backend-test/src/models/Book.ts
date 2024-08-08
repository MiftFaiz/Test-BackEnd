import mongoose, { Schema, Document } from 'mongoose';
import { IMember } from './Member';

export interface IBook extends Document {
  code: string;
  title: string;
  author: string;
  stock: number;
  member: IMember;
}

const BookSchema: Schema = new Schema({
  code: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  stock: { type: Number, default: 1 },
  member: { type: Schema.Types.ObjectId, ref: 'Member' },
});

export default mongoose.model<IBook>('Book', BookSchema);
