const mongoose = require('mongoose')
// const mongoosePaginate = require('mongoose-paginate-v2')
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const softDelete = require('mongoose-softdelete');
const moment = require('moment'); // require
const mongoTenant = require('mongo-tenant');

const PurchaseSchema = new mongoose.Schema(
  {
    controlNumber: {
      type: String,
      required: false,
      default: null
    },
    customer: {
      type: Object,
      required: true
    },
    items: {
      type: Object,
      required: false
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
      type: Number,
      required: false,
      default: 0
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

PurchaseSchema.post('save', (obj) => {
  const prefix = process.env.PREFIX_INVOICE;
  const day = moment().format('dd');
  const nextControl = moment().unix();
  obj.set('controlNumber', `${prefix}-${nextControl}${day}`, {strict: false})
  obj.save();
})

PurchaseSchema.plugin(aggregatePaginate)
PurchaseSchema.plugin(mongoTenant)
PurchaseSchema.plugin(softDelete)
module.exports = mongoose.model('Purchase', PurchaseSchema)
