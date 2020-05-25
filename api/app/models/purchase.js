const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const PurchaseSchema = new mongoose.Schema(
  {
    customer: {
      type: Object,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    author: {
      type: Object,
      required: true
    },
    status: {
      type: String,
      enum: ['paid', 'hold', 'process', 'exceptional'],
      default: 'hold'
    },
    deliveryAddress: {
      type: Object,
      required: true
    },
    deliveryType: {
      type: String,
      enum: ['to_send', 'in_house'],
      default: 'to_send'
    },
    total: {
      type: Object,
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


PurchaseSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Purchase', PurchaseSchema)
