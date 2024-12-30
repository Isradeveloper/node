import moongose from 'mongoose';

const userSchema = new moongose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  emailValidated: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  imgProfile: {
    type: String,
  },
  role: {
    type: [String],
    enum: ['ADMIN_ROLE', 'USER_ROLE'],
    default: ['USER_ROLE'],
  },
});

export const UserModel = moongose.model('User', userSchema);
