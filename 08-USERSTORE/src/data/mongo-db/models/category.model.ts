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

categorySchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
  },
});

export const CategoryModel = moongose.model('Category', categorySchema);
