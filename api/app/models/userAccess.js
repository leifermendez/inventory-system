const mongoose = require('mongoose')
const validator = require('validator')
const mongoTenant = require('mongo-tenant');
const UserAccessSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: 'EMAIL_IS_NOT_VALID'
      },
      lowercase: true,
      required: true
    },
    ip: {
      type: String,
      required: true
    },
    browser: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
UserAccessSchema.plugin(mongoTenant)
module.exports = mongoose.model('UserAccess', UserAccessSchema)
