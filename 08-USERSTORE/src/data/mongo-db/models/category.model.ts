import moongose, { Schema } from 'mongoose';

const categorySchema = new moongose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  available: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  },
});

export const CategoryModel = moongose.model('Category', categorySchema);
