import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  role: { 
    type: String, 
    enum: ['USER', 'COLLEGE_ADMIN', 'SUPER_ADMIN'],
    default: 'USER'
  },
  collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College' }
});

export const User = mongoose.models.User || mongoose.model('User', userSchema); 