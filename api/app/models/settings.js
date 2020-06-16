const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const softDelete = require('mongoose-softdelete');
const mongoTenant = require('mongo-tenant');
const SettingsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      default: null
    },
    currencySymbol: {
      type: String,
      required: false,
      default: null
    },
    currency: {
      type: String,
      required: false,
      default: null
    },
    logo: {
      type: String,
      required: false,
      default: null
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
SettingsSchema.plugin(mongoosePaginate)
SettingsSchema.plugin(mongoTenant)
SettingsSchema.plugin(softDelete)
module.exports = mongoose.model('Settings', SettingsSchema)
