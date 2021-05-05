const mongoose = require ('mongoose');
const validator = require ('validator');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const jwtKey = 'secretkey';

const usersSchema = mongoose.Schema ({
  name: {
    type: String,
    required: true,
    unique: false,
    trim:true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    trim:true,
    validate (value) {
      if (!validator.isEmail (value)) {
        throw new Error ('Email is invalid');
      }
    },
  },
  password: {
    type: String,
    required: true,
    unique: false,
    trim:true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password should not consist of string 'password'.");
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});


usersSchema.pre('save', async function (next) {
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

usersSchema.statics.findByCredentials = async (email, password) => {
	const user = await usersSchema.findOne({ email });
	if (!user) {
		throw new Error('Unable to login');
	}
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new Error('Unable to login');
	}
	return user;
};

usersSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign ({_id: user._id.toString ()}, jwtKey);

  user.tokens = user.tokens.concat ({token});
  await user.save ();
  return token;
};

usersSchema.pre ('save', async function (next) {
  const user = this;
  if (user.isModified ('password')) {
    user.password = await bcrypt.hash (user.password, 8);
  }
  next ();
});

usersSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.tokens;
	delete userObject.resetPasswordToken;

	return userObject;
};


const User = mongoose.model('User', usersSchema);
module.exports = User;