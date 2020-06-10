const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const softDelete = require('mongoose-softdelete');
const mongoTenant = require('mongo-tenant');
const StorageSchema = new mongoose.Schema(
  {
    original: {
      type: String,
      required: true
    },
    small: {
      type: String,
      required: true
    },
    medium: {
      type: String,
      required: true
    },
    large: {
      type: String,
      required: true
    },
    author: {
      type: Object,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
StorageSchema.plugin(mongoosePaginate)
StorageSchema.plugin(softDelete)
StorageSchema.plugin(mongoTenant)
module.exports = mongoose.model('Storage', StorageSchema)
