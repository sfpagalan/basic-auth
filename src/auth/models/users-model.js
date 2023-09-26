const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: String,
  fullname: String,
  role: { type: String, enum: ['admin', 'editor', 'writer', 'user'], required: true },
});

// Define a method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const match = await bcrypt.compare(candidatePassword, this.password);
    return match;
  } catch (error) {
    throw error;
  }
};

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
