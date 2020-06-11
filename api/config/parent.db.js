const mongoose = require('mongoose');
const PARENT_MONGO = process.env.MONGO_PARENT;
const moment = require('moment');
// const dbParent = mongoose.createConnection(
//   PARENT_MONGO,
//   {
//     keepAlive: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   },
//   (err, conn) => {
//     if (!err) {
//       console.log('*    Connection Parent')
//     }
//   });
//
//
// /**
//  * Models
//  * @type {Mongoose}
//  */
//
// const TenantSchema = new mongoose.Schema(
//   {
//     tenantDomain: {
//       type: String,
//       required: true
//     },
//     status: {
//       type: String,
//       enum: ['active', 'disable', 'blocked'],
//       default: 'active'
//     },
//     methodAllowFree: {
//       type: Array,
//       required: []
//     },
//     features: {
//       type: Array,
//       required: []
//     },
//     startAt: {
//       type: Object,
//       required: true
//     },
//     finishAt: {
//       type: Object,
//       required: true
//     }
//   },
//   {
//     versionKey: false,
//     timestamps: true
//   }
// )
// const Tenant = dbParent.model('Tenant', TenantSchema);

module.exports = {

  insertTest(tenant = null) {
    // Tenant.create({
    //   tenantDomain: tenant,
    //   status:'active',
    //   startAt:new Date(),
    //   finishAt:new Date(),
    // }, (err, item) => {
    //   console.log('--EEE--', err)
    //   console.log('--ITEM--', item)
    // })
  },
  async checkTenant(req) {
    return new Promise((resolve, reject) => {
      // const tenant = req.clientAccount;
      // Tenant.findOne({
      //   tenantDomain: tenant,
      // }, (err, item) => {
      //   if (!err) {
      //     const finishAt = moment(item.finishAt);
      //     const now = moment();
      //     const diff = finishAt.diff(now, 'minutes');
      //
      //     if (!item.status.includes('active')) {
      //       reject(null)
      //     }
      //
      //     /**
      //      * Limitamos por peticion a usuarios que expiraron
      //      */
      //     if (diff <= 0) {
      //       if (!req.method.includes(item.methodAllowFree)) {
      //         reject(null)
      //       } else {
      //         resolve(
      //           {
      //             status: item.status,
      //             minutes: diff
      //           }
      //         )
      //       }
      //     }
      //
      //     resolve(true);
      //   } else {
      //     reject(null)
      //   }
      // })
      resolve(true)
    })
  }

}

