const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

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
module.exports = mongoose.model('Storage', StorageSchema)
