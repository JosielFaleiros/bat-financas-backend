import mongoose from 'mongoose' 
import bcrypt from 'bcrypt'

// Schema defines how the user data will be stored in MongoDB
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

// Hash the user's password before inserting a new user TODO: procurar forma melhor
UserSchema.pre('save', function(next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
})

// Compare password input to password saved in database
UserSchema.methods.comparePassword = async function(pw) {
  return await bcrypt.compare(pw, this.password)
}

// Export the model
module.exports = mongoose.model('User', UserSchema);