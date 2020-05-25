const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ProvidersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    manager: {
      type: Object,
      required: true
    },
    address: {
      type: Object,
      required: true
    },
    trace: {
      type: Object
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    tag: {
      type: Object
    },
    description: {
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)


ProvidersSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Providers', ProvidersSchema)
