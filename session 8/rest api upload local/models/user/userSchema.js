const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');
const {ValidationError} = require("mongoose").Error
const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Yêu cầu nhập Email'],
    unique : true,
    // validate: {
    //   validator: function (value) {
    //     return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
    //   },
    //   message: 'Email không hợp lệ'
    // }
  },
  // name: {
  //   type: String,
  //   required: [true, 'Yêu cầu nhập User name']
  // },
  // age: {
  //   type: String,
  //   required: [true, 'Yêu cầu nhập tuổi']
  // },
  hashed_password: {
    type: String,
    required: [true, 'Yêu cầu nhập password'],
    minlength: 3
    // validate: {
    //   validator:  value => {
    //     if (this._confirmPassword && this._confirmPassword !== this.password) {
    //       this.invalidate('confirmPassword', 'Password confirmation does not match');
    //     }
    //     return true;
    //   }
    // }
  },
  roles: {
    type: [String],
    required: false,
    default: []
  },
  avatarUrl: {
    type: String,
    required: false,
    default: null
  },
});

UserSchema.methods = {
  authenticate: async function (password) {
    return bcrypt.compareSync(password, this.hashed_password);
  },

  encryptPassword: function (password) {
    if (!password) return '';

    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  },
};

UserSchema.virtual('confirmPassword')
  .set(function (value) {
    this._confirmPassword = value;
  })
  .get(function () {
    return this._confirmPassword;
  });

UserSchema.virtual('password')
  .set(function (password) {
    this._password = password;
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.path('hashed_password').validate(function (value) {
  if (this._confirmPassword && !this.authenticate(this._confirmPassword)) {
    this.invalidate('confirmPassword', 'Password confirmation does not match');
  }
  return true;
});

UserSchema.path('email').validate(function (value) {
  return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
});


UserSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(error);
  } else {
    next(error);
  }
});


// UserSchema.pre('save', async next => {
//   const user = this;
//   if (user.isModified('password')) {
//     try {
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(user.password, salt);
//       user.password = hashedPassword;
//       next();
//     } catch (err) {
//       next(err);
//     }
//   } else {
//     next();
//   }
// });

module.exports = UserSchema