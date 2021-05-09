const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtKey = 'secretkey';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    },
  },
  password: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password should not consist of string 'password'.");
      }
    },
  },
  stripe_account_id: '',
  stripe_seller: {},
  stripeSession: {},
},
  { timestamps: true }
);


userSchema.pre('save', function (next) {
  const user = this;
  if (user.isModified('password')) {
    return bcrypt.hash(user.password, 8, function (err, hash) {
      if (err) {
        console.log('BCRYPY HASH ERR', err);
        return next(err);
      }
      user.password = hash;
      return next();
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function (password, next) {
  bcrypt.compare(password, this.password, function (err, match) {
    if (err) {
      console.log("comparer password err", err)
      return next(err, false)
    }
    console.log("match password", match)
      return next(null, match)
    
  });
}


// userSchema.statics.findByCredentials = async (email, password) => {
//   const user = await usersSchema.findOne({ email });
//   if (!user) {
//     throw new Error('Unable to login');
//   }
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     throw new Error('Unable to login');
//   }
//   return user;
// };

// userSchema.methods.generateAuthToken = async function () {
//   const user = this;
//   const token = jwt.sign({ _id: user._id.toString() }, jwtKey);

//   user.tokens = user.tokens.concat({ token });
//   await user.save();
//   return token;
// };

// userSchema.pre('save', function (next) {
//   const user = this;
//   if (user.isModified('password')) {
//     return bcrypt.hash(user.password, 8, function (err, hash) {
//       if (err) {
//         console.log("bcrypt hash err :", err);
//         return next(err);
//       }
//       user.password = hash;
//       return next();
//     });
//   } else {
//     return next()

//   }
// });

// userSchema.methods.toJSON = function () {
//   const user = this;
//   const userObject = user.toObject();

//   delete userObject.password;
//   delete userObject.tokens;
//   delete userObject.resetPasswordToken;

//   return userObject;
// };


const User = mongoose.model('User', userSchema);
module.exports = User;