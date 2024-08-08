import mongoose, { Schema, Document } from 'mongoose';
import { IBook } from './Book';

export interface IMember extends Document {
  code: string;
  name: string;
  books: IBook[];
}

const MemberSchema: Schema = new Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
});

export default mongoose.model<IMember>('Member', MemberSchema);
