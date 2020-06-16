const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const mongoosePaginate = require('mongoose-paginate-v2')
const mongoTenant = require('mongo-tenant');
const softDelete = require('mongoose-softdelete');
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: false
    },
    nie: {
      type: String,
      required: false
    },
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: 'EMAIL_IS_NOT_VALID'
      },
      lowercase: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    role: {
      type: String,
      enum: ['customer', 'admin', 'manager', 'user', 'seller'],
      default: 'customer'
    },
    verification: {
      type: String
    },
    verified: {
      type: Boolean,
      default: false
    },
    tag: {
      type: Object
    },
    avatar: {
      type: String
    },
    description: {
      type: String
    },
    phone: {
      type: String,
      required: false
    },
    address: {
      type: Object,
      required: false
    },
    loginAttempts: {
      type: Number,
      default: 0,
      select: false
    },
    blockExpires: {
      type: Date,
      default: Date.now,
      select: false
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

const hash = (user, salt, next) => {
  bcrypt.hash(user.password, salt, (error, newHash) => {
    if (error) {
      return next(error)
    }
    user.password = newHash
    return next()
  })
}

const genSalt = (user, SALT_FACTOR, next) => {
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) {
      return next(err)
    }
    return hash(user, salt, next)
  })
}

UserSchema.pre('save', function (next) {
  const that = this
  const SALT_FACTOR = 5
  if (!that.isModified('password')) {
    return next()
  }
  return genSalt(that, SALT_FACTOR, next)
})

UserSchema.methods.comparePassword = function (passwordAttempt, cb) {
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) =>
    err ? cb(err) : cb(null, isMatch)
  )
}

UserSchema.plugin(mongoosePaginate)
UserSchema.plugin(mongoTenant)
UserSchema.plugin(softDelete)
module.exports = mongoose.model('User', UserSchema)
