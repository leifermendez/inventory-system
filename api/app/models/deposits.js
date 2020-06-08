const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const softDelete = require('mongoose-softdelete');
const mongoTenant = require('mongo-tenant');
const DepositsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
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
      type: String
    },
    tag: {
      type: Object
    },
    manager: {
      type: Object,
      required: true
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


DepositsSchema.plugin(mongoosePaginate)
DepositsSchema.plugin(mongoTenant)
DepositsSchema.plugin(softDelete)
module.exports = mongoose.model('Deposits', DepositsSchema)
