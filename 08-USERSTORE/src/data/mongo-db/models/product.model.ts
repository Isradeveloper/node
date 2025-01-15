import moongose, { Schema } from 'mongoose';

const productSchema = new moongose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
  },
  description: {
    type: String,
  },
  available: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required'],
  },
});

productSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
  },
});

export const ProductModel = moongose.model('Product', productSchema);
