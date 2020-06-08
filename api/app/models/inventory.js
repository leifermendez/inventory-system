const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const softDelete = require('mongoose-softdelete');
const mongoTenant = require('mongo-tenant');
const InventorySchema = new mongoose.Schema(
  {
    product: {
      type: Object,
      required: true
    },
    provider: {
      type: Object,
      required: true
    },
    qty: {
      type: Number,
      required: true
    },
    priceBase: {
      type: Number,
      required: false
    },
    deposit: {
      type: Object,
      required: true
    },
    author: {
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


InventorySchema.plugin(mongoosePaginate)
InventorySchema.plugin(mongoTenant)
InventorySchema.plugin(softDelete)
module.exports = mongoose.model('Inventory', InventorySchema)
