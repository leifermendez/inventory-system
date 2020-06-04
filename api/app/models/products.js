const mongoose = require('mongoose')
// const mongoosePaginate = require('mongoose-paginate-v2')
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const softDelete = require('mongoose-softdelete');
const ProductsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    prices: {
      type: Object,
      required: true
    },
    author: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    measures: {
      type: Object,
      required: false
    },
    categories: {
      type: Object
    },
    tag: {
      type: Object
    },
    gallery: {
      type: Array
    },
    sku: {
      type: String,
      required: false
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


ProductsSchema.plugin(aggregatePaginate)
ProductsSchema.plugin(softDelete)
module.exports = mongoose.model('Products', ProductsSchema)
